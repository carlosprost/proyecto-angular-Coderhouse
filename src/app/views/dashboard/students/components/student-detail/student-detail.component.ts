import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, distinctUntilChanged, map, toArray } from 'rxjs';
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
export class StudentDetailComponent implements OnDestroy {
  idStudent: number;
  student$: Observable<Student> = this.studentsService.getStudent(
    this.activatedRoute.snapshot.params['id']
  );
  courses$: Observable<Course[]> = this.courseServices.getCourses$();

  studentSource$: Observable<Student[]> = this.student$.pipe(
    map((student) => [student] as Student[])
  );

  enroll$: Observable<StudentEnrollments[]> =
    this.sEnroll.getStudentEnrollments$();

  createEnroll!: Subscription
  filterEnroll!: Subscription

  studentEnrollment: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private courseServices: CoursesService,
    private sEnroll: StudentEnrollmentsService,
    private fb: FormBuilder
  ) {
    this.idStudent = parseInt(this.activatedRoute.snapshot.params['id']);
    console.log(this.idStudent);
    

    this.sEnroll.loadStudentEnrollments$(this.idStudent);

    this.studentEnrollment = this.fb.group({
      student_id: [this.idStudent, [Validators.required]],
      course_id: ['', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this.filterEnroll.unsubscribe()
    this.createEnroll.unsubscribe()
    console.log('destroy');
    
  }

  onSubmit() {
    let enrollment = {
      student_id: this.studentEnrollment.value.student_id,
      course_id: this.studentEnrollment.value.course_id.id,
      course_name: this.studentEnrollment.value.course_id.name,
      date: this.studentEnrollment.value.course_id.date,
      hour: this.studentEnrollment.value.course_id.hour,
    };

    this.createStudentEnrollment(enrollment);
  }

  createStudentEnrollment(studentEnrollment: StudentEnrollments) {
    this.filterEnroll = this.enroll$
      .pipe(
        map((enrollment) =>
          enrollment.filter((enroll) =>
            this.existeCurso(enroll, studentEnrollment)
          )
        )
      )
      .subscribe((data) => {

        if (data.length === 0) {
          this.crearYSumarEnrollment(studentEnrollment);
        }
      });
  }

  crearYSumarEnrollment(studentEnrollment: StudentEnrollments) {
    this.createEnroll = this.sEnroll.createStudentEnrollment$(studentEnrollment).subscribe({
      next: (data) => {
        this.sEnroll.loadStudentEnrollments$(this.idStudent);
      },
    });
  }

  existeCurso(inscripto: StudentEnrollments, aInscribir: StudentEnrollments) {
    return (
      inscripto.course_id === aInscribir.course_id ||
      inscripto.course_name === aInscribir.course_name
    );
  }
}
