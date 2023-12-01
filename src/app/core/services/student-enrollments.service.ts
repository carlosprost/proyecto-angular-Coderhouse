import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentEnrollments } from '../../interfaces/student-enrollments';
import { BehaviorSubject, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentEnrollmentsService {
  URL = 'http://localhost:3000/studentEnrollments';
  constructor(private http: HttpClient) {}


  getStudentEnrollment$(idStudent: number) {
    return this.http
    .get<StudentEnrollments[]>(`${this.URL}?_expand=courses&_expand=students`)
    .pipe(
      map((resp) => resp.filter((enroll) => enroll.studentsId === idStudent))
    )
  }

  createStudentEnrollment$(studentEnrollment: StudentEnrollments) {
    
    return this.http.post<StudentEnrollments>(this.URL, studentEnrollment);
  }

  updateStudentEnrollment$(studentEnrollment: StudentEnrollments) {
    return this.http.put(
      `${this.URL}/${studentEnrollment.id}`,
      studentEnrollment
    );
  }

  deleteStudentEnrollment$(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
