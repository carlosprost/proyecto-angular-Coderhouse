import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, distinctUntilChanged, map, toArray } from 'rxjs';
import { Course } from 'src/app/interfaces/courses';
import { StudentEnrollments } from 'src/app/interfaces/student-enrollments';
import { Student } from 'src/app/interfaces/students';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentEnrollmentsService } from 'src/app/services/student-enrollments.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent {
  student$: Observable<Student> = this.studentsService.getStudent(
    this.activatedRoute.snapshot.params['id']
  );
  courses$: Observable<Course[]> = this.courseServices.getCourses$();

  studentSource$: Observable<Student[]> = this.student$.pipe(
    map((student) => [student] as Student[])
  );

  enroll$: Observable<StudentEnrollments[]> =
    this.sEnroll.getStudentEnrollments$();

  studentEnrollment: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private courseServices: CoursesService,
    private sEnroll: StudentEnrollmentsService,
    private fb: FormBuilder
  ) {
    this.sEnroll.loadStudentEnrollments$(
      parseInt(this.activatedRoute.snapshot.params['id'])
    );

    /* this.enroll$ = this.sEnroll.getStudentEnrollments$() */

    this.studentEnrollment = this.fb.group({
      student_id: this.activatedRoute.snapshot.params['id'],
      course_id: '',
    });
  }

  onSubmit() {
    let enrollment = {
      student_id: parseInt(this.studentEnrollment.value.student_id),
      course_id: this.studentEnrollment.value.course_id.id,
      course_name: this.studentEnrollment.value.course_id.name,
      date: this.studentEnrollment.value.course_id.date,
      hour: this.studentEnrollment.value.course_id.hour,
    };

    this.createStudentEnrollment(enrollment);
  }

  createStudentEnrollment(studentEnrollment: StudentEnrollments) {
    this.enroll$.subscribe({
      next: (data) => {
        if (
          data.some(
            (enroll) =>
              enroll.course_id !== studentEnrollment.course_id &&
              enroll.course_name !== studentEnrollment.course_name &&
              enroll.date !== studentEnrollment.date &&
              enroll.hour !== studentEnrollment.hour
          )
        ) {
          this.crearYSumarEnrollment(studentEnrollment);
          
        }
      },
    });
  }

  crearYSumarEnrollment(studentEnrollment: StudentEnrollments) {
    this.sEnroll.createStudentEnrollment$(studentEnrollment).subscribe({
      next: (data) => {
        this.sEnroll.loadStudentEnrollments$(
          parseInt(this.activatedRoute.snapshot.params['id'])
        );
      },
    });
  }
}
