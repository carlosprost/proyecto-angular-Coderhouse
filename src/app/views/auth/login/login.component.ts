import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin: FormGroup;
  passVisibility: boolean = false;

  constructor(
    private router: Router,
    private usersServices: UsersService,
    private fb: FormBuilder
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.usersServices.login(this.formLogin.value).subscribe({
      next: (user: User[]) => {
        if (user.length > 0) {
          Swal.fire({
            title: `Bienvenido ${user[0].name}!`,
            text: 'Ingresaste correctamente',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.formLogin.reset();
            }
          });
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
              this.router.navigate(['/dashboard']);
            },
          });
        }else if(user.length === 0){
          Swal.fire({
            title: 'Ups!',
            text: 'El email o la contraseña son incorrectos',
            icon: 'error',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.formLogin.reset();
            }
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
