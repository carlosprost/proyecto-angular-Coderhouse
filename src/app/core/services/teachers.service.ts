import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../../interfaces/teachers';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  URL: string = 'http://localhost:3000/teachers';
  constructor(private http: HttpClient) {}

  getTeachers() {
    return this.http.get<Teacher[]>(this.URL);
  }

  getTeacher(id: number) {
    return this.http.get<Teacher>(`${this.URL}/${id}`);
  }

  createTeacher(teacher: Teacher) {
    return this.http.post(this.URL, teacher);
  }

  deleteTeacher(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  updateTeacher(id: number, teacher: Teacher) {
    return this.http.put(`${this.URL}/${id}`, teacher);
  }
}
