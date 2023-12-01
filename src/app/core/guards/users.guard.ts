import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

export const usersGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const administrator = inject(UsersService).isAdministrator()
  let isAdministrator = false;

  administrator.subscribe((response) => {
    isAdministrator = response;
  });
  
  return isAdministrator ? true : router.createUrlTree(['/dashboard/home'])
};
