import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { DialogTeachersComponent } from './components/dialog-teachers/dialog-teachers.component';
import { TableTeachersComponent } from './components/table-teachers/table-teachers.component';

@NgModule({
  declarations: [
    TeachersComponent,
    TableTeachersComponent,
    DialogTeachersComponent,
  ],
  imports: [CommonModule, TeachersRoutingModule],
  providers: [TeachersService],
  exports: [TeachersComponent],
})
export class TeachersModule {}
