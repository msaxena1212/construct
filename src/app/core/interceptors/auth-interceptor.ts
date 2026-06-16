import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toast = inject(ToastrService);
  const token = authService.getToken();

  let modifyReq = req;

  if (token) {
    modifyReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  // return next(modifyReq).pipe(
  //   catchError((error: HttpErrorResponse) => {
  //     if (error.status === 401 || error.status === 403) {
  //       toast.error('Your session has expired or access is denied. Please log in again.', 'Unauthorized');
  //       authService.logout();
  //     }
  //     return throwError(() => error);
  //   })
  // );
  return next(modifyReq).pipe(
  catchError((error: HttpErrorResponse) => {

    // Token invalid / expired
    if (error.status === 401) {
      toast.error(
        'Your session has expired. Please log in again.',
      );
      authService.logout();
    }

    // Permission issue
    else if (error.status === 403) {
      toast.error(
        error.error?.message || 'Access denied'
      );
       authService.logout();
    }

    return throwError(() => error);
  })
);
};
