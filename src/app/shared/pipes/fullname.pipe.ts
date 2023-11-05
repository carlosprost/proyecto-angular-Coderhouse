import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../../interfaces/person';

@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {
  transform(value: Person, ...args: unknown[]): unknown {
    let fullname = value.firstName + ' ' + value.lastName;
    let option = args[0];

    switch (option) {
      case 'uppercase':
        fullname = fullname.toUpperCase();
        break;
      case 'lowercase':
        fullname = fullname.toLowerCase();
        break;
      default:
        break;
    }

    return fullname;
  }
}
