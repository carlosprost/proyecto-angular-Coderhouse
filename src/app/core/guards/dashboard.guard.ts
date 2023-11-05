import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const userActive = sessionStorage.getItem('userActive')
  
  return userActive ? true : router.createUrlTree(['/login/singin'])
};
