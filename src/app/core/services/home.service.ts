import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Course } from 'src/app/interfaces/courses';
import { Student } from 'src/app/interfaces/students';
import { Teacher } from 'src/app/interfaces/teachers';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  URL = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  
  getCountStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.URL}students`);
  }

  getCountTeacher(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.URL}teachers`)
  }

  getCountCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.URL}courses`)
  }
}
