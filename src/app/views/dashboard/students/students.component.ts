import { Component, OnInit } from '@angular/core';
import { DataTable } from 'src/app/interfaces/data-table';
import { Student } from 'src/app/interfaces/students';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  columnTable: DataTable[] = [
    {
      label: 'Nombre',
      def: 'firstName',
      key: 'firstName',
      dataType: 'string',
    },
    {
      label: 'Apellido',
      def: 'lastName',
      key: 'lastName',
      dataType: 'string',
    },
    {
      label: 'Edad',
      def: 'age',
      key: 'age',
      dataType: 'string',
    },
    {
      label: 'Estado',
      def: 'status',
      key: 'status',
      dataType: 'boolean',
    },
  ];
  students: Student[] = [];

  constructor(private db: StudentsService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  newStudent(student: Student) {
    this.students.push(student);
  }

  getStudents() {
    this.db.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }
}
