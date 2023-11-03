import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StudentsService } from 'src/app/services/students.service';
import { StudentsComponent } from './students.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TableComponent } from './components/table/table.component';
import { FullnamePipe } from 'src/app/pipes/fullname.pipe';
import { StatusPipe } from 'src/app/pipes/status.pipe';
import { DialogStudentComponent } from './components/dialog-student/dialog-student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentCourseTableComponent } from './components/student-detail/components/student-course-table/student-course-table.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentDetailTableComponent } from './components/student-detail/components/student-detail-table/student-detail-table.component';
import { StudentEnrollmentsService } from 'src/app/services/student-enrollments.service';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailComponent,
    DialogStudentComponent,
    TableComponent,
    FullnamePipe,
    StatusPipe,
    StudentCourseTableComponent,
    StudentDetailTableComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [StudentsService, CoursesService, StudentEnrollmentsService],
  exports: [StudentsComponent],
})
export class StudentsModule {}
