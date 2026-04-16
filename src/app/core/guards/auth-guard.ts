import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  if (authService.getAuthUser()) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
