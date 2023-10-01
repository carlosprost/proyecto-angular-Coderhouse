import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { StudentsComponent } from './students/students.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TeachersComponent } from './teachers/teachers.component';
import { CoursesComponent } from './courses/courses.component';
import { TableComponent } from '../../components/table/table.component';
import { FormComponent } from '../../components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentStatusPipe } from 'src/app/pipes/statusPipe/student-status.pipe';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    StudentsComponent,
    TeachersComponent,
    CoursesComponent,
    TableComponent,
    FormComponent,
    StudentStatusPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
