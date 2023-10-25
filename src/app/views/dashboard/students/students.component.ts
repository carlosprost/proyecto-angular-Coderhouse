import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/interfaces/students';
import { StudentsService } from 'src/app/services/students.service';
import { DialogStudentComponent } from './components/dialog-student/dialog-student.component';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit, OnDestroy {
  students$: Observable<Student[]>;

  /* Reloj */
  clock: string = '';
  clockSubscription: Subscription;

  constructor(private db: StudentsService, public dialog: MatDialog) {
    this.students$ = this.db.getStudents();

    /* Inicialización del Observable getClock */
    this.clockSubscription = this.getClock().subscribe({
      next: (time: string) => {
        console.log(time);
        this.clock = time;
      },
      complete: () => {
        console.log('Completado');
      },
    });
  }
  ngOnDestroy(): void {
    this.clockSubscription.unsubscribe();
    console.log('Se destruyo el reloj');
  }

  ngOnInit(): void {
    this.db.loadStudents();
  }

  openDialog() {
    const student: Student = {
      id: 0,
      firstName: '',
      lastName: '',
      age: '',
      status: false,
    };
    const dialogRef = this.dialog.open(DialogStudentComponent, {
      width: '500px',
      data: { message: 'Crear estudiante', student: student, isUpdate: false },
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
          student: student,
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
      },
    });
  }

  updateStudent(id: number, student: Student) {
    this.db.updateStudent(id, student).subscribe({
      next: (data) => {
        this.students$ = this.students$.pipe(
          map((students) => students.map((s) => (s.id === id ? student : s)))
        );
      },
      error: (error) => {
        console.log(error);
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

  /* Implementación del Observable del RELOJ */
  getClock(): Observable<string> {
    return new Observable<string>((observer) => {
      setInterval(() => {
        const date = new Date();
        let hour =
          date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        let minutes =
          date.getMinutes() < 10
            ? `0${date.getMinutes()}`
            : `${date.getMinutes()}`;
        let seconds =
          date.getSeconds() < 10
            ? `0${date.getSeconds()}`
            : `${date.getSeconds()}`;

        const time = `${hour}:${minutes}:${seconds}`;
        observer.next(time);
      }, 1000);
    });
  }

  searchStudent(dato: any) {
    console.log(dato?.target?.value);
    
    this.students$ = this.students$.pipe(
      map((students) =>
        students.filter(
          (s) =>
            s.firstName.toLowerCase().includes(dato.target.value.toLowerCase()) ||
            s.lastName.toLowerCase().includes(dato.target.value.toLowerCase())
        )
      )
    )
    
  }
}
