import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../../interfaces/courses';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  URL: string = 'http://localhost:3000/courses';
  constructor(private http: HttpClient) {}

  getCourses$() {
    return this.http.get<Course[]>(this.URL);
  }

  getCourse$(id: number) {
    return this.http.get<Course>(`${this.URL}/${id}`);
  }

  createCourse(course: Course) {
    return this.http.post<Course>(this.URL, course);
  }

  deleteCourse(id: number) {
    return this.http.delete<Course>(`${this.URL}/${id}`);
  }

  updateCourse(id: number, course: Course) {
    return this.http.put<Course>(`${this.URL}/${id}`, course);
  }

}
