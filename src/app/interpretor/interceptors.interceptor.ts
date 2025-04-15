import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorsInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem('token');
  const newreq=req.clone({
    setHeaders:{
      authorization:`${token}`
    }
  })
  return next(newreq);
};
