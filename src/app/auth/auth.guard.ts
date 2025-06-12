import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const token = localStorage.getItem('jwt');
  const role = localStorage.getItem('role');
  const requiredRole = route.data['role'];

  // CASE 1: If no token, allow login page, block others
  if (!token) {
    // Allow access to login route only
    if (state.url === '/auth/login' || state.url === '/login') {
      return true;
    }
    return router.createUrlTree(['/auth/login']);
  }

  // CASE 2: If token exists and user tries to visit login, redirect to role-specific route
  if (state.url === '/auth/login' || state.url === '/login') {
    if (role === 'ROLE_ADMIN') {
      return router.createUrlTree(['/admin']);
    } else if (role === 'ROLE_USER') {
      return router.createUrlTree(['/guest']);
    } else {
      return router.createUrlTree(['/unauthorized']);
    }
  }

  // CASE 3: If route has required role, match it
  if (requiredRole && role !== requiredRole) {
    return router.createUrlTree(['/unauthorized']);
  }

  return true;
};
