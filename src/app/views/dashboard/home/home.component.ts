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

  studentData = [
    {
      label: 'Students',
      data: [this.nroStudents]
    }
  ]

  teacherData = [
    {
      label: 'Teachers',
      data: [this.nroTeachers]
    }
  ]

  courseData = [
    {
      label: 'Courses',
      data: [this.nroCourses]
    }
  ]

  studentLabels = ['Students'];

  teacherLabels = ['Teachers'];

  courseLabels = ['Courses'];

  studentOptions = {
    responsive: true,
  }

  teacherOptions = {
    responsive: true,
  }

  courseOptions = {
    responsive: true,
  }

  constructor(
    private router: Router,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private coursesServices: CoursesService,
  ) {
    this.studentsService.countStudents$().subscribe({
      next: (nro) => {
        this.nroStudents = nro;
      }
    })

    this.teachersService.countTeachers$().subscribe({
      next: (nro) => {
        this.nroTeachers = nro;
      }
    })

    this.coursesServices.countCourses$().subscribe({
      next: (nro) => {
        this.nroCourses = nro;
      }
    })
  }



}
