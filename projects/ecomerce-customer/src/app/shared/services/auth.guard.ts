import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggin()) {
    router.navigate(["/login"]);
  }
  return authService.isLoggin();


};
export const authGuardLogin: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggin()) {
    router.navigate(["/"]);
    return false;
  }
  return true;
};
