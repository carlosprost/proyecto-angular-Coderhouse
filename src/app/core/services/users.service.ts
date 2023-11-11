import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/users';
import { BehaviorSubject, map } from 'rxjs';
import { Session } from '../../interfaces/session';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  URL: string = 'http://localhost:3000/users';
  URLSession: string = 'http://localhost:3000/session';
  constructor(private http: HttpClient) {}

  _user$ = new BehaviorSubject<User | null>(null);
  user$ = this._user$.asObservable();

  getUsers() {
    return this.http.get<User[]>(this.URL);
  }

  getUser$() {
    return this.user$
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
    ).subscribe({
      next: (user: User[]) => {
        this._user$.next(user[0]);
        this.storeSession(user[0]);
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  storeSession(user: User) {
    sessionStorage.setItem(
      'userActive',
      JSON.stringify({
        name: user.name,
        email: user.email,
      })
    );
    this.newSession({
      user_id: user.id,
      createSession: new Date(),
    }).subscribe();
  }
}
