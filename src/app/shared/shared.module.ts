import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FullnamePipe } from './pipes/fullname.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { FormRegisterErrorPipe } from './pipes/form-register.pipe';
import { TeacherInCoursePipe } from './pipes/teacher-in-course.pipe';




@NgModule({
  declarations: [
    StatusPipe,
    FullnamePipe,
    FormRegisterErrorPipe,
    TeacherInCoursePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    FullnamePipe,
    StatusPipe,
    TeacherInCoursePipe,
    FormRegisterErrorPipe
  ]
})
export class SharedModule { }
