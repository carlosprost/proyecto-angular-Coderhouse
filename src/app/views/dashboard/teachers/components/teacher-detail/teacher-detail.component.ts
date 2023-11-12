import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CoursesService } from 'src/app/core/services/courses.service';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { Course } from 'src/app/interfaces/courses';
import { Teacher } from 'src/app/interfaces/teachers';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss'],
})
export class TeacherDetailComponent {
  idTeacher: number = this.activatedRoute.snapshot.params['id'];
  teacher$!: Observable<Teacher[]>;
  courses$!: Observable<Course[]>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private teachersService: TeachersService,
    private coursesService: CoursesService
  ) {
    this.teacher$ = this.teachersService.getTeachers$().pipe(
      map((teachers) =>
        teachers.filter((teacher) => teacher.id == this.idTeacher)
      )
    )
    this.courses$ = this.coursesService
      .getCourses$()
      .pipe(
        map((courses) =>
          courses.filter(
            (course) =>
              !!course.teacher_id && course.teacher_id == this.idTeacher
          )
        )
      );
  }
}
