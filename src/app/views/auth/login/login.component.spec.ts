import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersService } from 'src/app/core/services/users.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoginState } from 'src/app/store/login/login.reducer';
import { selectUserActive } from 'src/app/store/login/login.selectors';

describe('LoginComponent', () => {
  let loginComponent: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [BrowserAnimationsModule, HttpClientTestingModule, ReactiveFormsModule, SharedModule],
      providers: [
        UsersService,
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
      ]
    });
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('Formulario invalido cuando esta vacío y los campos pasa a esta marcados "touched"', ()=>{
    loginComponent.onSubmit();
    expect(loginComponent.formLogin.invalid).toBeTruthy();
    expect(loginComponent.formLogin.get('email')?.touched).toBeTruthy();
    expect(loginComponent.formLogin.get('password')?.touched).toBeTruthy();
  });

  it('Es llamado el método login de UserService', ()=>{
    loginComponent.formLogin.patchValue({
      email: 'admin@mail.com',
      password: '123456'
    })
    const spyUserService = spyOn((loginComponent as any).usersServices, 'login');
    loginComponent.onSubmit();

    expect(spyUserService).toHaveBeenCalled();
  });
});
