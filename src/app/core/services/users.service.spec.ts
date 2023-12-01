import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User } from 'src/app/interfaces/users';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { LoginState } from 'src/app/store/login/login.reducer';
import { selectUserActive } from 'src/app/store/login/login.selectors';

describe('UserService', () => {
  let userService: UsersService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockProvider(Router),
        provideMockStore<LoginState>({
          initialState: {
            userActive: null,
          },
          selectors: [
            {
              selector: selectUserActive,
              value: {
                id: 1,
                name: 'test',
                email: 'test@mail.com',
                role: 'ADMIN',
                password: '123456',
              },
            },
          ],
        }),
      ],
    });

    userService = TestBed.inject(UsersService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('Debe establecer un usuario autenticado', () => {
    const USER_MOCK: User = {
      id: 1,
      name: 'test',
      email: 'test@mail.com',
      role: 'ADMIN',
      password: '123456',
    };

    userService.login(USER_MOCK);

    httpController
      .expectOne({
        method: 'GET',
        url: 'http://localhost:3000/users',
      })
      .flush([USER_MOCK]);

    userService.getUser$().subscribe((user) => {
      expect(user).toEqual(USER_MOCK);
    });
  });
});
