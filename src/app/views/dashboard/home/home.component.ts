import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Student } from 'src/app/interfaces/students';
import { Teacher } from 'src/app/interfaces/teachers';
import { Course } from 'src/app/interfaces/courses';
import { HomeService } from 'src/app/core/services/home.service';
import { StudentsService } from 'src/app/core/services/students.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  students: Observable<Student[]>;
  teachers: Observable<Teacher[]>;
  courses: Observable<Course[]>;

  nroStudents!: Observable<number[]>;
  nroTeachers!: Observable<number[]>;
  nroCourses!: Observable<number[]>;

  studentsActives!: Observable<number[]>;
  teachersAssigned!: Observable<number[]>;
  coursesNotAssigned!: Observable<number[]>;

  constructor(private router: Router, private homeService: HomeService) {
    this.students = this.homeService.getCountStudent();
    this.teachers = this.homeService.getCountTeacher();
    this.courses = this.homeService.getCountCourses();

    this.setNumbersElements()
    this.numberStudentsActives()
    this.numberTeachersAssigned()
    this.numberCoursesNotAssigned()
    
  }

  setNumbersElements(){
    this.nroStudents = this.students.pipe(
      map((students: Student[]) => [students.length])
    );
    this.nroTeachers = this.teachers.pipe(
      map((teachers: Teacher[]) => [teachers.length])
    );
    this.nroCourses = this.courses.pipe(
      map((courses: Course[]) => [courses.length])
    );
  }

  numberStudentsActives(){
    this.studentsActives = this.students.pipe(
      map((students: Student[]) => [
        students.filter((student) => student.status === true).length,
      ])
    );
  }

  numberTeachersAssigned(){
    let teachers: number[] = [];
    this.teachersAssigned = this.courses.pipe(
      
      map((courses: Course[]) => [
        courses.filter((course) => this.isTeacherNotRepeated(course.teachersId, teachers)).length
      ])
    );
  }

  isTeacherNotRepeated(id: number | undefined, teachers: number[]) {
    let result: Set<number> = new Set();
    
    if(id !== undefined) {
      if(teachers.includes(id)) return false
      teachers.push(id)
      result = new Set(teachers)
    }

    return teachers.length === result.size;
  }

  numberCoursesNotAssigned(){
    this.coursesNotAssigned = this.courses.pipe(
      map((courses: Course[]) => [
        courses.filter((course) => course.teachersId === undefined).length,
      ])
    );
  }

  goTo(navigate: string) {
    this.router.navigate([`/dashboard/${navigate}`]);
  }
}
