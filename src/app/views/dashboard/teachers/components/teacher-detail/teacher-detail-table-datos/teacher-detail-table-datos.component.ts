import { Component, Input } from '@angular/core';
import { Teacher } from 'src/app/interfaces/teachers';

@Component({
  selector: 'app-teacher-detail-table-datos',
  templateUrl: './teacher-detail-table-datos.component.html',
  styleUrls: ['./teacher-detail-table-datos.component.scss']
})
export class TeacherDetailTableDatosComponent {

  @Input() teacher!: Teacher[];

  columns: string[] = ['id', 'firstName', 'lastName'];

}
