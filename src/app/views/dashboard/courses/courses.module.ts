import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesService } from 'src/app/core/services/courses.service';
import { HttpClientModule } from '@angular/common/http';
import { CoursesComponent } from './courses.component';
import { DialogCoursesComponent } from './components/dialog-courses/dialog-courses.component';
import { TableCoursesComponent } from './components/table-courses/table-courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CoursesComponent,
    DialogCoursesComponent,
    TableCoursesComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CoursesService],
  exports: [CoursesComponent],
})
export class CoursesModule {}
