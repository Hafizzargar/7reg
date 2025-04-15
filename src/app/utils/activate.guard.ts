import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const activateGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);
  const loggeduser=localStorage.getItem("token");
  console.log(loggeduser);
  if(localStorage.getItem("token")){
    return true
  }
  else{
    router.navigateByUrl('')
  }
  return false;
};
