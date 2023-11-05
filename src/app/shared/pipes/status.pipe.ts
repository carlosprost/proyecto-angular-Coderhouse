import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/interfaces/students';

@Pipe({
  name: 'StatusPipe'
})
export class StatusPipe implements PipeTransform {

  transform(row: Student): unknown {
    let value = row.status;

    if (typeof value === 'boolean') {
      return value ? 'Activo' : 'Inactivo';
    }

    return value;
  }

}
