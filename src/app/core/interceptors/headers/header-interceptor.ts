import { HttpInterceptorFn } from '@angular/common/http';
import { CheckPlatForm } from '../../auth/services/check-plat-form';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let checkPlatForm: CheckPlatForm = inject(CheckPlatForm);
  if (checkPlatForm.isBrwoser()) {
    req = req.clone({
      setHeaders: {
        AUTHORIZATION: 'Bearer ' + localStorage.getItem('usertoken'),
      },
    });
  }
  return next(req);
};
