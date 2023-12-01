import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from 'src/app/interfaces/courses';
import { Teacher } from 'src/app/interfaces/teachers';

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ courses: Course[]; teachers: Teacher[], isAdmin: boolean }>(),
    'Load Courses Failure': props<{ error: any }>(),

    //Crear curso
    'Create Course': props<{ payload: Course }>(),
    'Create Course Failure': props<{ error: any }>(),

    //Editar curso
    'Update Course': props<{ id: number; payload: Course }>(),
    'Update Course Failure': props<{ error: any }>(),

    //Eliminar curso
    'Delete Course': props<{ id: number }>(),
    'Delete Course Failure': props<{ error: any }>(),
  }
});
