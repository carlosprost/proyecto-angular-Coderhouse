import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { StudentsComponent } from './views/dashboard/students/students.component';
import { TeachersComponent } from './views/dashboard/teachers/teachers.component';
import { CoursesComponent } from './views/dashboard/courses/courses.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard', 
        component: DashboardComponent,
        children:[
            {
                path: 'students',
                component: StudentsComponent
            },
            {
                path: 'teachers',
                component: TeachersComponent
            },
            {
                path: 'courses',
                component: CoursesComponent
            },
            {
                path: '**',
                redirectTo: 'students'
            }
        
        ]
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