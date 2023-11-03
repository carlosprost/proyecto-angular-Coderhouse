import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formRegister: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.formRegister = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  register() {
    if (
      this.formRegister.valid &&
      this.formRegister.value.password ===
      this.formRegister.value.confirmPassword
    ) {
      this.usersService.createUser(this.formRegister.value).subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire('Success', 'User registered successfully', 'success');
          window.location.href = '/login';
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
    window.location.href = '/login';
  }

  confirmPassword() {
    let password = this.formRegister.get('password');
    let confirmPassword = this.formRegister.get('confirmPassword');
    if (password && confirmPassword) {
      return password.value === confirmPassword.value
        ? confirmPassword.setErrors(null)
        : confirmPassword.setErrors({ notSame: true });
    }
  }
}
