import { Pipe, PipeTransform } from '@angular/core';
import { DataTable } from 'src/app/interfaces/data-table';

@Pipe({
  name: 'studentStatus'
})
export class StudentStatusPipe implements PipeTransform {

  transform(row: any, dataTable: DataTable): unknown {
    let value = row[dataTable.key];

    if (dataTable.dataType === 'boolean') {
      return value ? 'Activo' : 'Inactivo';
    }

    return value;
  }

}
