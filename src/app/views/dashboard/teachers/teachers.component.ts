import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { Teacher } from 'src/app/interfaces/teachers';
import { DialogTeachersComponent } from './components/dialog-teachers/dialog-teachers.component';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {

  isAdmin$: Observable<boolean> = this.usersService.isAdministrator();

  teachers$: Observable<Teacher[]>;

  constructor(private teachersService: TeachersService, private usersService: UsersService, public dialog: MatDialog) {
    this.teachers$ = this.teachersService.getTeachers$();

  }

  openDialog() {
    const teacher: Teacher = {
      id: 0,
      firstName: '',
      lastName: '',
    };
    const dialogRef = this.dialog.open(DialogTeachersComponent, {
      width: '500px',
      data: { message: 'Crear profesor', data: teacher, isUpdate: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createTeacher(result.data);
      }
    });
  }

  openDialogEdit(id: number) {
    
    this.teachersService.getTeacher$(id).subscribe((teacher: Teacher[]) => {
      
      const dialogRef = this.dialog.open(DialogTeachersComponent, {
        width: '500px',
        data: {
          message: 'Editar profesor',
          data: teacher,
          isUpdate: true,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.updateTeacher(id, result.data);
        }
      });
    });
  }

  createTeacher(teacher: Teacher) {
    this.teachersService.createTeacher(teacher).subscribe({
      next: (data: any) => {
        this.teachers$ = this.teachers$.pipe(
          map((teachers) => [...teachers, { ...data }])
        );
      },
    });
  }

  updateTeacher(id: number, teacher: Teacher) {
    this.teachersService.updateTeacher(id, teacher).subscribe({
      next: (data) => {
        this.teachers$ = this.teachers$.pipe(
          map((teachers) => teachers.map((s) => (s.id === id ? teacher : s)))
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteTeacher(id: number) {
    this.teachersService.deleteTeacher(id).subscribe(() => {
      this.teachers$ = this.teachers$.pipe(
        map((teachers) => teachers.filter((s) => s.id !== id))
      );
    });
  }

  searchTeacher(dato: any) {
    this.teachers$ = this.teachers$.pipe(
      map((teachers) =>
      teachers.filter(
          (s) =>
            s.firstName
              .toLowerCase()
              .includes(dato.target.value.toLowerCase()) ||
            s.lastName.toLowerCase().includes(dato.target.value.toLowerCase())
        )
      )
    );
  }
}
