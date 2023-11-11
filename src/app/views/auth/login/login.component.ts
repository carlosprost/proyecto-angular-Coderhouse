import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserActive } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user$: Observable<User | null> = this.usersServices.getUser$();

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
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
    } else {
      this.usersServices.login(this.formLogin.value);
      this.sessionActive();
    }
  }

  sessionActive() {
    this.user$.subscribe({
      next: (user) => {
        if (user) {
          this.sessionSuccessful(user);
        } else {
          this.sessionFallida();
        }
      },
    });
  }

  sessionSuccessful(user: UserActive) {
    Swal.fire({
      title: `Bienvenido ${user.name}!`,
      text: 'Ingresaste correctamente',
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        this.formLogin.reset();
      }
    });
    this.router.navigate(['/dashboard']);
  }

  sessionFallida() {
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
}
