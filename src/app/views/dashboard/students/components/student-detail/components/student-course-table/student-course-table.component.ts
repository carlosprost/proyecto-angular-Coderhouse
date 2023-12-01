import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/interfaces/courses';
import { StudentEnrollments } from 'src/app/interfaces/student-enrollments';

@Component({
  selector: 'app-student-course-table',
  templateUrl: './student-course-table.component.html',
  styleUrls: ['./student-course-table.component.scss']
})
export class StudentCourseTableComponent {
  @Input() studentCourses!: StudentEnrollments[]
  @Output() deleteCourse: EventEmitter<number> = new EventEmitter();
  columns: string[] = ['coursesId', 'date', 'hour', 'actions'];

  constructor() {}


}
