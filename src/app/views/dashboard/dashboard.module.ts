import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from 'src/app/views/dashboard/components/sidebar/sidebar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ToolbarComponent } from 'src/app/views/dashboard/components/toolbar/toolbar.component';
import { DashboardRoutingModule } from './dashborad-routing.module';

@NgModule({
  declarations: [DashboardComponent, ToolbarComponent, SidebarComponent],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
