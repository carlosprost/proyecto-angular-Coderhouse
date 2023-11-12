import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../interfaces/students';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  URL: string = 'http://localhost:3000/students';
  constructor(private http: HttpClient) {}

  private students$ = new BehaviorSubject<Student[]>([]);

  private studentesObservarble$ = this.students$.asObservable();

  loadStudents() {
    this.http.get<Student[]>(this.URL).subscribe({
      next: (data: Student[]) => {
        this.students$.next(data);
      },
    });
  }

  getStudents(): Observable<Student[]> {
    return this.studentesObservarble$;
  }

  getStudent(id: number) {
    return this.http.get<Student>(`${this.URL}/${id}`);
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

  countStudents() {
    this.loadStudents();
    return this.studentesObservarble$
  }
}
