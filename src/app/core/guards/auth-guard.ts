import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckPlatForm } from '../auth/services/check-plat-form';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let checkPlatForm = inject(CheckPlatForm);
   if (checkPlatForm.isBrwoser()) {

     if (localStorage.getItem(`usertoken`)) {
       
       return true;
     }else{
        return router.createUrlTree([`/login`]);
     }
  }
  return true

};
