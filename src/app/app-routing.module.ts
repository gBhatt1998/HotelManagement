import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationModule } from './reservation/reservation.module';

const routes: Routes = [
 { path:'',loadChildren:()=>import('./reservation/reservation.module').then(m=>ReservationModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 