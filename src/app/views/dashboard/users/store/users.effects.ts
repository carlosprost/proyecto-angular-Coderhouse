import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { UsersActions } from './users.actions';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/interfaces/users';

@Injectable()
export class UsersEffects {
  loadUserss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUserss),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getUsers().pipe(
          map((users) => UsersActions.loadUserssSuccess({users})),
          catchError((error) => of(UsersActions.loadUserssFailure({ error })))
        )
      )
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.createUser),
      concatMap(({user}) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createUser(user).pipe(
          map((users) => UsersActions.loadUserss()),
          catchError((error) => of(UsersActions.createUserFailure({ error })))
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.updateUser),
      concatMap(({id, user}) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.updateUser(id, user).pipe(
          map((users) => UsersActions.loadUserss()),
          catchError((error) => of(UsersActions.updateUserFailure({ error })))
        )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      concatMap(({id}) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.deleteUser(id).pipe(
          map((users) => UsersActions.loadUserss()),
          catchError((error) => of(UsersActions.deleteUserFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private usersService: UsersService) {}

  getUsers(): Observable<User[]> {
    return this.usersService.getUsers$()
  }

  createUser(user: User): Observable<User[]> {
    return this.usersService.createUser$(user)
  }

  updateUser(id: number, user: User): Observable<User[]> {
    return this.usersService.updateUser(id, user)
  }

  deleteUser(id: number): Observable<User[]> {
    return this.usersService.deleteUser(id)
  }


}
