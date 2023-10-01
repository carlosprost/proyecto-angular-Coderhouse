import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student, StudentCreated } from '../interfaces/students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  URL: string = 'http://localhost:3000/students'
  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get<Student[]>(this.URL)
  }

  createStudent(student: StudentCreated) {
    return this.http.post(this.URL, student)
  }
}
