import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/interfaces/courses';
import { Teacher } from 'src/app/interfaces/teachers';

@Component({
  selector: 'app-table-courses',
  templateUrl: './table-courses.component.html',
  styleUrls: ['./table-courses.component.scss'],
})
export class TableCoursesComponent {
  @Input() dataSource!: Course[];

  @Input() teachers: Teacher[] = [];

  columns: string[] = ['id', 'name', 'date', 'hour', 'teacher', 'actions'];

  @Output() editElement: EventEmitter<number> = new EventEmitter();
  @Output() deleteElement: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {}
}
