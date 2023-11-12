import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/interfaces/courses';

@Component({
  selector: 'app-teacher-detail-table-course',
  templateUrl: './teacher-detail-table-course.component.html',
  styleUrls: ['./teacher-detail-table-course.component.scss']
})
export class TeacherDetailTableCourseComponent {

  @Input() courses!: Course[];

  @Output() deleteCourse: EventEmitter<number> = new EventEmitter<number>();

  columns: string[] = ['id', 'name', 'date', 'hour', 'actions'];

}
