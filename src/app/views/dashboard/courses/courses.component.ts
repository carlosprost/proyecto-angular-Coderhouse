import { Component } from '@angular/core';
import { Course } from 'src/app/interfaces/courses';
import { CoursesService } from 'src/app/core/services/courses.service';
import { DialogCoursesComponent } from './components/dialog-courses/dialog-courses.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { Teacher } from 'src/app/interfaces/teachers';
import { TeachersService } from 'src/app/core/services/teachers.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  teachers$: Observable<Teacher[]>;
  constructor(
    private coursesServices: CoursesService,
    private teacherService: TeachersService,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesServices.getCourses$();
    this.teachers$ = this.teacherService.getTeachers$();
  }

  openDialog() {
    const course: Course = {
      id: 0,
      name: '',
      date: '',
      hour: '',
      teacher_id: 0,
    };
    const dialogRef = this.dialog.open(DialogCoursesComponent, {
      width: '500px',
      data: {
        message: 'Crear Curso',
        data: { course: course, teacher: this.teachers$ },
        isUpdate: false,
      },
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
          data: { course: Course, teacher: this.teachers$ },
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
      next: (data: Course) => {
        this.courses$ = this.courses$.pipe(
          map((courses) => courses.map((s) => (s.id === id ? data : s)))
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
