import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './core/guards/dashboard.guard';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'dashboard',
        canActivate: [dashboardGuard],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];

@NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
export class AppRoutingModule { }