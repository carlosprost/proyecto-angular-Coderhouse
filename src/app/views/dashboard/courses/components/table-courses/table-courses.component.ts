import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/interfaces/courses';
import { DataTable } from 'src/app/interfaces/data-table';

@Component({
  selector: 'app-table-courses',
  templateUrl: './table-courses.component.html',
  styleUrls: ['./table-courses.component.scss'],
})
export class TableCoursesComponent {
  @Input() dataSource!: Course[];

  columns: string[] = ['id', 'name', 'date', 'hour', 'actions'];

  @Output() editElement: EventEmitter<number> = new EventEmitter();
  @Output() deleteElement: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {}
}
