import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/interfaces/students';
import { StudentsService } from 'src/app/core/services/students.service';
import { DialogStudentComponent } from './components/dialog-student/dialog-student.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  isAdmin$: Observable<boolean> = this.usersService.isAdministrator();
  students$: Observable<Student[]>;

  constructor(private db: StudentsService, private usersService: UsersService, public dialog: MatDialog) {
    this.students$ = this.db.getStudents$();
  }

  openDialog() {
    const student: Student = {
      id: 0,
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      address: '',
      phone: '',
      status: false,
    };
    const dialogRef = this.dialog.open(DialogStudentComponent, {
      width: '500px',
      data: { message: 'Crear estudiante', data: student, isUpdate: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createStudent(result.data);
      }
    });
  }

  openDialogEdit(id: number) {
    
    this.db.getStudent(id).subscribe((student: Student) => {
      
      const dialogRef = this.dialog.open(DialogStudentComponent, {
        width: '500px',
        data: {
          message: 'Editar estudiante',
          data: student,
          isUpdate: true,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.updateStudent(id, result.data);
        }
      });
    });
  }

  createStudent(student: Student) {
    this.db.createStudent(student).subscribe({
      next: (data: any) => {
        this.students$ = this.students$.pipe(
          map((students) => [...students, { ...data }])
        );
        Swal.fire({
          title: 'Estudiante creado',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then();
      },
    });
  }

  updateStudent(id: number, student: Student) {
    
    this.db.updateStudent(id, student).subscribe({
      next: (data) => {
        this.students$ = this.students$.pipe(
          map((students) => students.map((s) => (s.id === id ? student : s)))
        );
        Swal.fire({
          title: 'Estudiante actualizado',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then();
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrio un error al actualizar',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        }).then();
      },
    });
  }

  deleteStudent(id: number) {
    this.db.deleteStudent(id).subscribe(() => {
      this.students$ = this.students$.pipe(
        map((students) => students.filter((s) => s.id !== id))
      );
    });
  }

  searchStudent(dato: any) {
    this.students$ = this.students$.pipe(
      map((students) =>
        students.filter(
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
