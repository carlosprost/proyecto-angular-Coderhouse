import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
import { CoursesActions } from './courses.actions';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/interfaces/courses';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { Teacher } from 'src/app/interfaces/teachers';
import { UsersService } from 'src/app/core/services/users.service';

export interface DataCourses {
  courses: Course[];
  teachers: Teacher[];
  isAdmin: boolean;
}


@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getCourses().pipe(
          map(data => CoursesActions.loadCoursesSuccess(data)),
          catchError(error => of(CoursesActions.loadCoursesFailure({ error })))
        )
      )      
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.createCourse),
      concatMap(({payload}) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createCourse(payload).pipe(
          map(data => CoursesActions.loadCourses()),
          catchError(error => of(CoursesActions.createCourseFailure({ error })))
        )
      )      
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.updateCourse),
      concatMap(({id, payload}) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.updateCourse(id, payload).pipe(
          map(data => CoursesActions.loadCourses()),
          catchError(error => of(CoursesActions.updateCourseFailure({ error })))
        )
      )      
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      concatMap(({id}) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.deleteCourse(id).pipe(
          map(data => CoursesActions.loadCourses()),
          catchError(error => of(CoursesActions.deleteCourseFailure({ error })))
        )
      )      
    );
  })


  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private coursesService: CoursesService,
    private teachersService: TeachersService,
  ) {}

  getCourses(): Observable<DataCourses> {
    return forkJoin([
      this.coursesService.getCourses$(),
      this.teachersService.getTeachers$(),
      this.usersService.isAdministrator()
    ]).pipe(
      map(([courses, teachers, isAdmin]) => {
        return {courses, teachers, isAdmin}
      })
    )
  }

  createCourse(course: Course): Observable<Course> {
    return this.coursesService.createCourse(course)
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.coursesService.updateCourse(id, course)
  }

  deleteCourse(id: number): Observable<Course> {
    return this.coursesService.deleteCourse(id)
  }
}
