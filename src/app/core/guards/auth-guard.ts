import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const signIn: any = localStorage.getItem('signInUser');
  const singInUser = JSON.parse(signIn);
  if (singInUser) {
    return true;
  } else {
    return router.navigate(['/auth/login']);
  }
  return true;
};
