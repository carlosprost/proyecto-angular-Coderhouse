import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { ForgotenModule } from './forgoten/forgoten.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { AuthComponent } from './auth.component';
import { UsersService } from 'src/app/services/users.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    LoginModule,
    RegisterModule,
    ForgotenModule
  ],
  providers: [UsersService],
  exports: [AuthComponent]
})
export class AuthModule { }
