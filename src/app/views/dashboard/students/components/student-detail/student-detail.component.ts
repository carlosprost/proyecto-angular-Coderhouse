import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Course } from 'src/app/interfaces/courses';
import { StudentEnrollments } from 'src/app/interfaces/student-enrollments';
import { Student } from 'src/app/interfaces/students';
import { CoursesService } from 'src/app/core/services/courses.service';
import { StudentEnrollmentsService } from 'src/app/core/services/student-enrollments.service';
import { StudentsService } from 'src/app/core/services/students.service';
import Swal from 'sweetalert2';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent {
  idStudent: number = parseInt(this.activatedRoute.snapshot.params['id']);
  student$: Observable<Student[]> = this.studentsService
    .getStudent(this.idStudent)
    .pipe(map((student) => [student] as Student[]));
  courses$: Observable<Course[]> = this.courseServices.getCourses$();

  enroll$: Observable<StudentEnrollments[]> =
    this.sEnroll.getStudentEnrollment$(this.idStudent);

  studentEnrollment: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private studentsService: StudentsService,
    private courseServices: CoursesService,
    private sEnroll: StudentEnrollmentsService,
    private fb: FormBuilder
  ) {
    this.studentEnrollment = this.fb.group({
      studentsId: [this.idStudent, [Validators.required]],
      coursesId: ['', [Validators.required]],
    });
  }

  onSubmit() {
    let enrollment = {
      studentsId: this.studentEnrollment.value.studentsId,
      coursesId: this.studentEnrollment.value.coursesId,
    };

    this.createStudentEnrollment(enrollment);
  }

  createStudentEnrollment(studentEnrollment: StudentEnrollments) {
    let curso = '';
    this.courses$
      .pipe(
        map((courses) => {
          return courses.filter((course) => {
            if (course.id === studentEnrollment.coursesId) {
              curso = course.name;
            }
          });
        })
      )
      .subscribe();

    this.enroll$
      .pipe(
        map((enrollment) =>
          enrollment.filter((enroll) =>
            this.existeCurso(enroll, studentEnrollment, curso)
          )
        )
      )
      .subscribe((data) => {
        if (data.length === 0) {
          this.crearYSumarEnrollment(studentEnrollment);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El estudiante ya se encuentra inscripto en este curso',
            showConfirmButton: true,
          }).then();
        }
      });
  }

  crearYSumarEnrollment(studentEnrollment: StudentEnrollments) {
    this.sEnroll.createStudentEnrollment$(studentEnrollment).subscribe({
      next: (data: StudentEnrollments) => {
        this.enroll$ = this.sEnroll.getStudentEnrollment$(this.idStudent);
        Swal.fire({
          icon: 'success',
          title: 'Estudiante inscripto',
          showConfirmButton: false,
          timer: 1500,
        }).then();
      },
    });
  }

  existeCurso(
    inscripto: StudentEnrollments,
    aInscribir: StudentEnrollments,
    courseName: String
  ) {
    console.log('curso: ', courseName);

    return (
      inscripto.coursesId === aInscribir.coursesId ||
      inscripto.courses?.name === courseName
    );
  }

  deleteCourse(id: number) {
    this.sEnroll.deleteStudentEnrollment$(id).subscribe({
      next: (data) => {
        this.enroll$ = this.enroll$.pipe(
          map((enroll) => enroll.filter((enroll) => enroll.id !== id))
        );
        Swal.fire({
          icon: 'success',
          title: 'Curso eliminado',
          showConfirmButton: false,
          timer: 1500,
        }).then();
      },
    });
  }
}
