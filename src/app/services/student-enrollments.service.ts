import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentEnrollments } from '../interfaces/student-enrollments';
import { BehaviorSubject, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentEnrollmentsService {
  URL = 'http://localhost:3000/studentEnrollments';
  URLCourse = 'http://localhost:3000/courses';
  constructor(private http: HttpClient) { }

  private studentEnroll= new BehaviorSubject<StudentEnrollments[]>([])
  private studentEnrollObservable$ = this.studentEnroll.asObservable()

  getStudentEnrollments$() {
    return this.studentEnrollObservable$
  }
  loadStudentEnrollments$(idStudent: number) {
    this.http.get<StudentEnrollments[]>(this.URL)
    .pipe(
      map(resp => resp.filter(enroll => enroll.student_id === idStudent))
      )
      .subscribe(
        (data: StudentEnrollments[]) => {
              this.studentEnroll.next(data)
        }
      )
     
  }

  createStudentEnrollment$(studentEnrollment: StudentEnrollments) {
    return this.http.post(this.URL, studentEnrollment);
  }

  updateStudentEnrollment$(studentEnrollment: StudentEnrollments) {
    return this.http.put(`${this.URL}/${studentEnrollment.id}`, studentEnrollment);
  }

  deleteStudentEnrollment$(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }

}
