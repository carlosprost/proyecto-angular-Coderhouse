import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/users';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Userss': emptyProps(),
    'Load Userss Success': props<{ users: User[] }>(),
    'Load Userss Failure': props<{ error: unknown }>(),

    //Crear usuario
    'Create User': props<{ user: User }>(),
    'Create User Failure': props<{ error: unknown }>(),

    //Editar usuario
    'Update User': props<{ id: number; user: User }>(),
    'Update User Failure': props<{ error: unknown }>(),

    //Eliminar usuario
    'Delete User': props<{ id: number }>(),
    'Delete User Failure': props<{ error: unknown }>(),
  }
});
