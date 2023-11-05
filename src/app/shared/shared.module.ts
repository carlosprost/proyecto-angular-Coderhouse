import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FullnamePipe } from './pipes/fullname.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { FormRegisterErrorPipe } from './pipes/form-register.pipe';




@NgModule({
  declarations: [
    StatusPipe,
    FullnamePipe,
    FormRegisterErrorPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    FullnamePipe,
    StatusPipe,
    FormRegisterErrorPipe
  ]
})
export class SharedModule { }
