import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationModule } from './modules/reservation/reservation.module';
import { authGuard } from './guard/auth.guard';
import { UnauthorizedComponent } from './modules/auth/unauthorized/unauthorized.component';

const routes: Routes = [
 { path:'',loadChildren:()=>import('./modules/reservation/reservation.module').then(m=>ReservationModule)},
   { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full'  },
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard], data: { role: 'ROLE_ADMIN' } },
  {path: 'guest', loadChildren: () => import('./modules/guest/guest.module').then(m => m.GuestModule),canActivate: [authGuard], data: { role: ['ROLE_USER','ROLE_ADMIN'] } },
  { path: '**', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 