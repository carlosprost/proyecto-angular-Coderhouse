import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User } from 'src/app/interfaces/users';

describe('UserService', () => {
  let userService: UsersService;
  let httpController: HttpTestingController;
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    userService = TestBed.inject(UsersService);
    httpController = TestBed.inject(HttpTestingController);
  })

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('Debe establecer un usuario autenticado', ()=>{
    const USER_MOCK: User = {
      id: 1,
      name: 'test',
      email: 'test@mail.com',
      password: '123456'
    }

    userService.login(USER_MOCK);

    httpController.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/users',
    }).flush([USER_MOCK]);

    userService.getUser$().subscribe((user)=>{
      expect(user).toEqual(USER_MOCK);
    })

  })


});
