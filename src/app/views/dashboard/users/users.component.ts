import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/users.actions';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/interfaces/users';
import { selectUsers } from './store/users.selectors';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users$: Observable<User[]>

  constructor(private store: Store, public dialog: MatDialog) {
    this.store.dispatch(UsersActions.loadUserss())
    this.users$ = this.store.select(selectUsers)
   }


  openDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: {
        message: 'Crear Usuario',
        data: null,
        isUpdate: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createUser(result.data);
      }
    });
  }

  openDialogEdit(id: number) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: {
        message: 'Editar Usuario',
        data: id,
        isUpdate: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateUser(id, result.data);
      }
    });
  }

  createUser(user: User) {
    this.store.dispatch(UsersActions.createUser({ user: user }));
    Swal.fire({
      icon: 'success',
      title: 'Curso creado',
      showConfirmButton: false,
      timer: 1500,
    }).then()
  }

  updateUser(id: number, user: User) {
    this.store.dispatch(UsersActions.updateUser({ id, user: user }));
    Swal.fire({
      icon: 'success',
      title: 'Curso actualizado',
      showConfirmButton: false,
      timer: 1500,
    }).then()
  }

  deleteUser(id: number) {
    this.store.dispatch(UsersActions.deleteUser({ id }));
    Swal.fire({
      icon: 'success',
      title: 'Curso eliminado',
      showConfirmButton: false,
      timer: 1500,
    }).then()
  }

  searchUsers(dato: any) {
    this.users$ = this.users$.pipe(
      map((users: User[]) =>
        users.filter((user) =>
          user.name.toLowerCase().includes(dato.target.value.toLowerCase())
        )
      )
    );
  }

}
