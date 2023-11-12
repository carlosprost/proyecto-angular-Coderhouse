import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { TeacherDetailComponent } from './components/teacher-detail/teacher-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersComponent,
  },
  {
    path: 'teacher-detail/:id',
    component: TeacherDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
