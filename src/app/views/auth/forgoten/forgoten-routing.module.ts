import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotenComponent } from './forgoten.component';

const routes: Routes = [
    {
        path: '',
        component: ForgotenComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ForgotenRoutingModule { }
