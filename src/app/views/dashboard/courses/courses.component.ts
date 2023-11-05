import { Component } from '@angular/core';
import { Course } from 'src/app/interfaces/courses';
import { CoursesService } from 'src/app/core/services/courses.service';
import { DialogCoursesComponent } from './components/dialog-courses/dialog-courses.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  constructor(
    private coursesServices: CoursesService,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesServices.getCourses$();
  }

  openDialog() {
    const course: Course = {
      id: 0,
      name: '',
    };
    const dialogRef = this.dialog.open(DialogCoursesComponent, {
      width: '500px',
      data: { message: 'Crear Curso', course: course, isUpdate: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createCourse(result.data);
      }
    });
  }

  openDialogEdit(id: number) {
    this.coursesServices.getCourse$(id).subscribe((Course: Course) => {
      const dialogRef = this.dialog.open(DialogCoursesComponent, {
        width: '500px',
        data: {
          message: 'Editar curso',
          Course: Course,
          isUpdate: true,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.updateCourse(id, result.data);
        }
      });
    });
  }

  createCourse(course: Course) {
    this.coursesServices.createCourse(course).subscribe({
      next: (data: any) => {
        this.courses$ = this.courses$.pipe(
          map((courses) => [...courses, { ...data }])
        );
      },
    });
  }

  updateCourse(id: number, course: Course) {
    this.coursesServices.updateCourse(id, course).subscribe({
      next: (data) => {
        this.courses$ = this.courses$.pipe(
          map((courses) => courses.map((s) => (s.id === id ? course : s)))
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteCourse(id: number) {
    this.coursesServices.deleteCourse(id).subscribe(() => {
      this.courses$ = this.courses$.pipe(
        map((courses) => courses.filter((s) => s.id !== id))
      );
    });
  }

  searchCourse(dato: any) {
    this.courses$ = this.courses$.pipe(
      map((courses) =>
        courses.filter((s) =>
          s.name.toLowerCase().includes(dato.target.value.toLowerCase())
        )
      )
    );
  }
}
