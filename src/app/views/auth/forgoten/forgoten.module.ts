import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotenComponent } from './forgoten.component';
import { ForgotenRoutingModule } from './forgoten-routing.module';



@NgModule({
  declarations: [
    ForgotenComponent
  ],
  imports: [
    CommonModule,
    ForgotenRoutingModule
  ],
  exports: [
    ForgotenComponent
  ]
})
export class ForgotenModule { }
