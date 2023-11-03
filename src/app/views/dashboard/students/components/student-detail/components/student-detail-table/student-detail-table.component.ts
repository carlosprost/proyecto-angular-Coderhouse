import { Component, Input } from '@angular/core';
import { Student } from 'src/app/interfaces/students';

@Component({
  selector: 'app-student-detail-table',
  templateUrl: './student-detail-table.component.html',
  styleUrls: ['./student-detail-table.component.scss']
})
export class StudentDetailTableComponent {

  columns: string[] = ['firstName', 'lastName', 'age'];
  @Input() studentDetail!: Student[];
  
  constructor() { }


}
