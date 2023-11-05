import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.formRegister = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.formRegister.get('confirmPassword')?.setValidators(this.passwordValidator());
  }

  register() {
    if (
      this.formRegister.invalid &&
      this.formRegister.get('password')?.value !==
      this.formRegister.get('confirmPassword')?.value
    ) {
      this.formRegister.markAllAsTouched();
    } else {
      let user: User = {
        name: `${this.formRegister.value.name} ${this.formRegister.value.lastName}`,
        email: this.formRegister.value.email,
        password: this.formRegister.value.password,
      };

      this.usersService.createUser(user).subscribe({
        next: (res) => {
          Swal.fire('Success', 'User registered successfully', 'success');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error', 'Error registering user', 'error');
        },
      });
    }
  }

  onCancel() {
    this.formRegister.reset();
    this.router.navigate(['/login']);
  }

  passwordValidator(): ValidatorFn {
    return () => {

      const password = this.formRegister.get('password')?.value;
      const repeat_password = this.formRegister.get('confirmPassword')?.value;

      if(!password || !repeat_password) return { isValid: false };

      if(password!==repeat_password) return {isValid:false};      
      
      return null;
    };
  }
}
