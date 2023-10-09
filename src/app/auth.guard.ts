import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
inject
export const authGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)
  if (localStorage.getItem('token')) {
    return true;
  } else {
    _Router.navigate(['/login'])
    return false;
  }
};
