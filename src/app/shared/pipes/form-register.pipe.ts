import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formRegisterError'
})
export class FormRegisterErrorPipe implements PipeTransform {

  transform(value: AbstractControl<any, any> | null, ...args: unknown[]): unknown {
    let errorMessage: string[] = [];
    let password = args[0];

    if (value === null || !value) return null
    let errors = value.errors as ValidationErrors;

    if ('required' in errors) {
      errorMessage.push('El campo es requerido');
    }

    if ('email' in errors) {
      errorMessage.push('El campo debe ser un email');
    }

    if ('minlength' in errors) {
      errorMessage.push(`El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`);
    }

    if ('maxlength' in errors) {
      errorMessage.push(`El campo debe tener a lo más ${errors['maxlength'].requiredLength} caracteres`);
    }

    let confirmPassword = value.value

    if(password && confirmPassword && password !== confirmPassword) {
      console.log(password && confirmPassword && password !== confirmPassword);
      
      errorMessage.push('Las contraseñas no coinciden');
    }


    return errorMessage.join('. ');
  }

}
