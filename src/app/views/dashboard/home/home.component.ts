import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/core/services/courses.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { TeachersService } from 'src/app/core/services/teachers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  nroStudents: number = 0;
  nroTeachers: number = 0;
  nroCourses: number = 0;


  constructor(
    private router: Router,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private coursesServices: CoursesService,
  ) {
    this.studentsService.countStudents().subscribe({
      next: (data) => {
        this.nroStudents = data.length;
        console.log('Nro. de Estudiantes: ', this.nroStudents);
        
      }
    })

    this.teachersService.getTeachers$().subscribe({
      next: (data) => {
        this.nroTeachers = data.length;
        console.log('Nro. de Profesores: ', this.nroTeachers);
        
      }
    })

    this.coursesServices.getCourses$().subscribe({
      next: (data) => {
        this.nroCourses = data.length;
        console.log('Nro. de Cursos: ', this.nroCourses);
      }
    })


    console.log(this.nroStudents, this.nroTeachers, this.nroCourses);
    
    
   }

}
