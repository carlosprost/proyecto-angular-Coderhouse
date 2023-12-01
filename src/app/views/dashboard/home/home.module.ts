import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from 'src/app/core/services/home.service';


@NgModule({
  declarations: [HomeComponent, CardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    SharedModule,
    NgChartsModule,
  ],
  providers: [HomeService],
  exports: [HomeComponent]
})
export class HomeModule { }
