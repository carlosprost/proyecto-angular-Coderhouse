import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Output() students: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() teachers: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() courses: EventEmitter<boolean> = new EventEmitter<boolean>();

  openStudents() {
    this.students.emit(true);
  }

  openTeachers() {
    this.teachers.emit(true);
  }

  openCourses() {
    this.courses.emit(true);
  }
  

}
