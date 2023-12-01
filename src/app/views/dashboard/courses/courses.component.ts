import { Component } from '@angular/core';
import { Course } from 'src/app/interfaces/courses';
import { CoursesService } from 'src/app/core/services/courses.service';
import { DialogCoursesComponent } from './components/dialog-courses/dialog-courses.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { Teacher } from 'src/app/interfaces/teachers';
import { Store } from '@ngrx/store';
import { selectCourses, selectIsAdmin, selectTeachers } from './store/courses.selectors';
import { CoursesActions } from './store/courses.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  isAdmin$: Observable<boolean>
  courses$: Observable<Course[]>;
  teachers$: Observable<Teacher[]>;
  constructor(private store: Store, public dialog: MatDialog) {
    this.store.dispatch(CoursesActions.loadCourses());
    this.isAdmin$ = this.store.select(selectIsAdmin)
    this.courses$ = this.store.select(selectCourses);
    this.teachers$ = this.store.select(selectTeachers);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCoursesComponent, {
      width: '500px',
      data: {
        message: 'Crear Curso',
        data: null,
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
    const dialogRef = this.dialog.open(DialogCoursesComponent, {
      width: '500px',
      data: {
        message: 'Editar curso',
        data: id,
        isUpdate: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateCourse(id, result.data);
      }
    });
  }

  createCourse(course: Course) {
    this.store.dispatch(CoursesActions.createCourse({ payload: course }));
    Swal.fire({
      icon: 'success',
      title: 'Curso creado',
      showConfirmButton: false,
      timer: 1500,
    }).then()
  }

  updateCourse(id: number, course: Course) {
    this.store.dispatch(CoursesActions.updateCourse({ id, payload: course }));
    Swal.fire({
      icon: 'success',
      title: 'Curso actualizado',
      showConfirmButton: false,
      timer: 1500,
    }).then()
  }

  deleteCourse(id: number) {
    this.store.dispatch(CoursesActions.deleteCourse({ id }));
    Swal.fire({
      icon: 'success',
      title: 'Curso eliminado',
      showConfirmButton: false,
      timer: 1500,
    }).then()
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
