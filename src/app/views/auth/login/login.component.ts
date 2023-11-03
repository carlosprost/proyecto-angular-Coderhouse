import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin: FormGroup;
  passVisibility: boolean = false;

  constructor(private usersServices: UsersService, private fb: FormBuilder) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log(this.formLogin.value);
    this.usersServices.login(this.formLogin.value).subscribe({
      next: (user: User[]) => {
        console.log(user);

        if (user.length > 0) {
          sessionStorage.setItem(
            'userActive',
            JSON.stringify({
              name: user[0].name,
              email: user[0].email,
            })
          );
          let session = {
            user_id: user[0].id,
            createSession: new Date(),

          };
          this.usersServices.newSession(session).subscribe({
            next: (res) => {
              console.log(res);
              window.location.href = '/dahsboard';
            },
          });

        }
      },
    });
  }

  
}
