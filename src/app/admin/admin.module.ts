import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AllReservationsComponent } from './all-reservations/all-reservations.component';
import { reservationReducer } from './store/all-reservation/all-reservation.reducer';
import { ReservationEffects } from './store/all-reservation/all-reservation.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DepartmentComponent } from './department/department.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AllReservationsComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
      StoreModule.forFeature('allReservations', reservationReducer),

    // Register the feature effect
    EffectsModule.forFeature([ReservationEffects]),
  ]
})
export class AdminModule { }
