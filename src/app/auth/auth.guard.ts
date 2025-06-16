import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = authService.getToken();
  const role = authService.getRole();
  const requiredRole = route.data['role'];

  
  if (!token) {
    if (state.url === '/auth/login' || state.url === '/login') {
      return true;
    }
    return router.createUrlTree(['/auth/login']);
  }

  if (state.url === '/auth/login' || state.url === '/login') {
    if (role === 'ROLE_ADMIN') {
      return router.createUrlTree(['/admin']);
    } else if (role === 'ROLE_USER' || role === 'ROLE_GUEST') {
      return router.createUrlTree(['/guest']);
    } else {
      return router.createUrlTree(['/unauthorized']);
    }
  }

  console.log('Token:', token);
console.log('Decoded Role:', role);
console.log('Expected Role:', requiredRole);

  if (requiredRole && role !== requiredRole) {
    return router.createUrlTree(['/unauthorized']);
  }

  return true;
};
