import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../modules/auth/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = authService.getToken();
  const role = authService.getRole();
  const requiredRoles = route.data['role'];

  
  if (!token) {
    if (state.url === '/auth/login' || state.url === '/login') {
      return true;
    }
    return router.createUrlTree(['/auth/login']);
  }

  if (state.url === '/auth/login' || state.url === '/login') {
    if (role === 'ROLE_ADMIN') {
      return router.createUrlTree(['/admin']);
    } else if (role === 'ROLE_USER' || role === 'ROLE_ADMIN') {
      return router.createUrlTree(['/guest']);
    } else {
      return router.createUrlTree(['/unauthorized']);
    }
  }

  console.log('Token:', token);
console.log('Decoded Role:', role);
console.log('Expected Role:', requiredRoles);

  if (requiredRoles) {
    if (Array.isArray(requiredRoles)) {
      if (!requiredRoles.includes(role)) {
        return router.createUrlTree(['/unauthorized']);
      }
    } else {
      if (role !== requiredRoles) {
        return router.createUrlTree(['/unauthorized']);
      }
    }
  }

  return true;
};
