import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StudentsService } from 'src/app/core/services/students.service';
import { StudentsComponent } from './students.component';
import { TableComponent } from './components/table/table.component';
import { DialogStudentComponent } from './components/dialog-student/dialog-student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from 'src/app/core/services/courses.service';
import { StudentCourseTableComponent } from './components/student-detail/components/student-course-table/student-course-table.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentDetailTableComponent } from './components/student-detail/components/student-detail-table/student-detail-table.component';
import { StudentEnrollmentsService } from 'src/app/core/services/student-enrollments.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailComponent,
    DialogStudentComponent,
    TableComponent,
    StudentCourseTableComponent,
    StudentDetailTableComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [StudentsService, CoursesService, StudentEnrollmentsService],
  exports: [StudentsComponent],
})
export class StudentsModule {}
