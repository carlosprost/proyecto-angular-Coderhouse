import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCreated } from '../interfaces/users';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URL: string = 'http://localhost:3000/teachers'
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.URL)
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.URL}/${id}`)
  }

  login(userLogin: User) {
    return this.getUser(userLogin.id).pipe(map((user: User) => user.password === userLogin.password));
  }

  createUser(user: UserCreated) {
    return this.http.post(this.URL, user)
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.URL}/${id}`)
  }

  updateUser(id: number, user: UserCreated) {
    return this.http.put(`${this.URL}/${id}`, user)
  }
}
