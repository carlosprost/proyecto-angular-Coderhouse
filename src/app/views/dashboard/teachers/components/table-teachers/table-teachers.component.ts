import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/interfaces/teachers';

@Component({
  selector: 'app-table-teachers',
  templateUrl: './table-teachers.component.html',
  styleUrls: ['./table-teachers.component.scss']
})
export class TableTeachersComponent {
  
  @Input() data!: Teacher[];
  @Input() isAdmin!: boolean;

  columns: string[] = ['firstName', 'lastName', 'actions'];

  @Output() editElement: EventEmitter<number> = new EventEmitter();
  @Output() deleteElement: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router) {
    
  }

  teacherDetail(id: number) {
    console.log(id);
    
    this.router.navigate(['dashboard', 'teachers', 'teacher-detail', id])
  }
}
