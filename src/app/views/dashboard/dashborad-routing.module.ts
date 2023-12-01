import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { usersGuard } from "src/app/core/guards/users.guard";

const routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'students',
                loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
            },
            {
                path: 'teachers',
                loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule)
            },
            {
                path: 'courses',
                loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
            },
            {
                path: 'users',
                canActivate: [usersGuard],
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}