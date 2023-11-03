import { Component, Input } from '@angular/core';
import { Course } from 'src/app/interfaces/courses';
import { StudentEnrollments } from 'src/app/interfaces/student-enrollments';

@Component({
  selector: 'app-student-course-table',
  templateUrl: './student-course-table.component.html',
  styleUrls: ['./student-course-table.component.scss']
})
export class StudentCourseTableComponent {
  @Input() course!: Course[]
  @Input() studentCourses!: StudentEnrollments[]
  columns: string[] = ['course_id', 'date', 'hour'];

  constructor() {
    console.log(this.studentCourses);
  }

  courseName(id: number){
    let course: Course | undefined = this.course.find(course => course.id === id)
    return course ? course.name : '';
  }

}
