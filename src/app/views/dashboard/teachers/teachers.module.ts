import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { DialogTeachersComponent } from './components/dialog-teachers/dialog-teachers.component';
import { TableTeachersComponent } from './components/table-teachers/table-teachers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeacherDetailComponent } from './components/teacher-detail/teacher-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TeacherDetailTableCourseComponent } from './components/teacher-detail/teacher-detail-table-course/teacher-detail-table-course.component';
import { TeacherDetailTableDatosComponent } from './components/teacher-detail/teacher-detail-table-datos/teacher-detail-table-datos.component';

@NgModule({
  declarations: [
    TeachersComponent,
    TableTeachersComponent,
    DialogTeachersComponent,
    TeacherDetailComponent,
    TeacherDetailTableCourseComponent,
    TeacherDetailTableDatosComponent,
  ],
  imports: [CommonModule, TeachersRoutingModule, ReactiveFormsModule, HttpClientModule, SharedModule],
  providers: [TeachersService],
  exports: [TeachersComponent],
})
export class TeachersModule {}
