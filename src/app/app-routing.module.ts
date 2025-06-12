import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationModule } from './reservation/reservation.module';
import { authGuard } from './auth/auth.guard';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';

const routes: Routes = [
 { path:'',loadChildren:()=>import('./reservation/reservation.module').then(m=>ReservationModule)},
   { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full'  },
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard], data: { role: 'ROLE_ADMIN' } },
  {path: 'guest', loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule),canActivate: [authGuard], data: { role: 'ROLE_USER' } },
  { path: '**', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 