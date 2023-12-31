import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserActive } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginActions } from 'src/app/store/login/login.actions';
import { selectLoginState } from 'src/app/store/login/login.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user$: Observable<UserActive | null> = this.usersServices.getUser$();

  formLogin: FormGroup;
  passVisibility: boolean = false;

  constructor(
    private store: Store,
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
      icon: 'success',
      title: 'Bienvenido',
      text: `${user.name}`,
      showConfirmButton: true,
    }).then((result) => {
      this.formLogin.reset();
    });
    
    this.router.navigate(['/dashboard']);
  }

  sessionFallida() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Usuario o contraseña incorrecta',
      showConfirmButton: false,
      timer: 3000,
    }).then((result) => {
      this.formLogin.reset();
    });
  }
}
