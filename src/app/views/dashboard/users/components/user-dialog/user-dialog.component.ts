import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { DataDialog } from 'src/app/interfaces/data-dialog';
import { User } from 'src/app/interfaces/users';
import { selectUsers } from '../../store/users.selectors';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
})
export class UserDialogComponent {
  Users$: Observable<User[]>;
  formUser!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog
  ) {
    this.Users$ = this.store.select(selectUsers);
    this.createFormStudent(data.data);
  }

  dialogClose() {
    this.dialogRef.close();
  }

  createFormStudent(id: number | null) {
    if (id === null) {
      this.formUser = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        role: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    } else {
      this.getUser(id).subscribe((user: User[]) => {
        this.formUser = this.fb.group({
          name: [user[0].name, [Validators.required]],
          email: [user[0].email, [Validators.required, Validators.email]],
          role: [user[0].role, [Validators.required]],
          password: [
            user[0].password,
            [Validators.required, Validators.minLength(6)],
          ],
        });
      });
    }
  }

  onSubmit() {
    let obj: User = {
      name: this.formUser.value.name,
      email: this.formUser.value.email,
      role: this.formUser.value.role,
      password: this.formUser.value.password,
    };

    this.dialogRef.close({ data: obj });
  }

  getUser(id: number): Observable<User[]> {
    return this.Users$.pipe(
      map((users) => users.filter((user) => user.id === id))
    );
  }
}
