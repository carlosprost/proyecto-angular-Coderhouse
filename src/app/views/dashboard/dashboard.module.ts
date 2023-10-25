import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { StudentsComponent } from './students/students.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TeachersComponent } from './teachers/teachers.component';
import { CoursesComponent } from './courses/courses.component';
import { TableComponent } from './students/components/table/table.component';
import { FormComponent } from '../../components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusPipe } from 'src/app/pipes/status.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { DialogStudentComponent } from './students/components/dialog-student/dialog-student.component';
import { FullnamePipe } from 'src/app/pipes/fullname.pipe';
import { DialogCoursesComponent } from './courses/components/dialog-courses/dialog-courses.component';
import { TableCoursesComponent } from './courses/components/table-courses/table-courses.component';
import { TableTeachersComponent } from './teachers/components/table-teachers/table-teachers.component';
import { DialogTeachersComponent } from './teachers/components/dialog-teachers/dialog-teachers.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    SidebarComponent,
    StudentsComponent,
    TeachersComponent,
    CoursesComponent,
    TableComponent,
    FormComponent,
    StatusPipe,
    FullnamePipe,
    DialogStudentComponent,
    DialogCoursesComponent,
    TableCoursesComponent,
    TableTeachersComponent,
    DialogTeachersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
