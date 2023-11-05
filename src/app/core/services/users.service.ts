import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/users';
import { map } from 'rxjs';
import { Session } from '../../interfaces/session';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  URL: string = 'http://localhost:3000/users';
  URLSession: string = 'http://localhost:3000/session';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.URL);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.URL}/${id}`);
  }

  login(userLogin: User) {
    return this.http.get<User[]>(`${this.URL}`).pipe(
      map((users) => {
        return users.filter(
          (user) =>
            user.email === userLogin.email &&
            user.password === userLogin.password
        );
      })
    );
  }

  newSession(session: Session) {
    return this.http.post(`${this.URLSession}`, session);
  }

  createUser(user: User) {
    return this.http.post(this.URL, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${this.URL}/${id}`, user);
  }
}
