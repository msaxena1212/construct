import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const signIn: any = localStorage.getItem('signInUser');
  const singInUser = JSON.parse(signIn);

  // if (!singInUser) {
  //   return next.handle(request);
  // } else {
  //   const modifyReq = request.clone({
  //     // setHeaders: { Authorization: `Bearer ${singInUser._token}`}
  //   });
  //   return next.handle(modifyReq);
  // }
  return next(req);
};
