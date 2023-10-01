import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  students: boolean = true;
  teachers: boolean = false;
  courses: boolean = false;

  openStudents(event: boolean) {
    this.students = event;
    this.teachers = false;
    this.courses = false;
  }

  openTeachers(event: boolean) {
    this.students = false;
    this.teachers = event;
    this.courses = false;
  }

  openCourses(event: boolean) {
    this.students = false;
    this.teachers = false;
    this.courses = event;
  }


}
