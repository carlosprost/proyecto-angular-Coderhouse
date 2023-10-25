import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RegiterComponent } from './components/regiter/regiter.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegiterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
