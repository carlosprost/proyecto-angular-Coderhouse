import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../interfaces/students';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  URL: string = 'http://localhost:3000/students';
  constructor(private http: HttpClient) {}

  getStudents$(): Observable<Student[]> {
    return this.http.get<Student[]>(this.URL);
  }

  getStudent(id: number) {
    return this.http.get<Student>(`${this.URL}/${id}`)
  }

  createStudent(student: Student) {
    return this.http.post(this.URL, student);
  }

  deleteStudent(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  updateStudent(id: number, student: Student) {
    return this.http.put(`${this.URL}/${id}`, student);
  }

}
