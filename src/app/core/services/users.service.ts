import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserActive } from '../../interfaces/users';
import { BehaviorSubject, map, of } from 'rxjs';
import { Session } from '../../interfaces/session';
import { Store } from '@ngrx/store';
import { LoginActions } from 'src/app/store/login/login.actions';
import { selectUserActive } from 'src/app/store/login/login.selectors';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  URL: string = 'http://localhost:3000/users';
  URLSession: string = 'http://localhost:3000/session';

  constructor(private http: HttpClient, private store: Store) {}

  user$ = this.store.select(selectUserActive)

  getUsers$() {
    return this.http.get<User[]>(this.URL);
  }

  getUser$() {
    return this.user$;
  }

  getUserActive(){
    let userActive = JSON.parse(sessionStorage.getItem('userActive') ?? '{}');
    
    this.http.get<User[]>(`${this.URL}?email=${userActive.email}`).pipe(
      map((users) => {
        if(users.length === 0){
          this.logOut();
        }else{
          
          const userActive = users[0]
          
          this.handleAuthUser(userActive);
        }
      })
    ).subscribe()
  }

  login(userLogin: User) {
    return this.http
      .get<User[]>(`${this.URL}`)
      .pipe(
        map((users) => {
          return users.filter(
            (user) =>
              user.email === userLogin.email &&
              user.password === userLogin.password
          );
        })
      )
      .subscribe({
        next: (user: User[]) => {
          this.handleAuthUser(user[0]);
          this.newSession({
            usersId: user[0].id,
            createSession: new Date(),
          }).subscribe();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handleAuthUser(user: User) {

    const userActive: UserActive = {
      name: user.name,
      email: user.email,
      role: user.role,
    }

    this.store.dispatch(LoginActions.login({ user: userActive }));

    this.storeSession(user);
  }

  newSession(session: Session) {
    return this.http.post(`${this.URLSession}`, session);
  }

  createUser$(user: User) {
    return this.http.post<User[]>(this.URL, user);
  }

  deleteUser(id: number) {
    return this.http.delete<User[]>(`${this.URL}/${id}`);
  }

  updateUser(id: number, user: User) {
    return this.http.put<User[]>(`${this.URL}/${id}`, user);
  }

  storeSession(user: User) {
    sessionStorage.setItem(
      'userActive',
      JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
      })
    );
    
  }

  isAdministrator() {
    const userActive = JSON.parse(sessionStorage.getItem('userActive') ?? '{}');
    return of(userActive.role === 'ADMIN');
  }

  logOut(){
    this.store.dispatch(LoginActions.resetUser());
    sessionStorage.removeItem('userActive');
    window.location.href = '/login';
  }
}
