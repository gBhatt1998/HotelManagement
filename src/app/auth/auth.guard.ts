import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const requiredRole = route.data['role'];

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  if (requiredRole && role !== requiredRole) {
    router.navigate(['/unauthorized']); 
    return false;
  }

  return true;
};
