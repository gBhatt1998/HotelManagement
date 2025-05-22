import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation/reservation.component';
import { SharedModule } from '../shared/shared.module';
import { RoomListComponent } from './room-list/room-list.component';

import { reservationReducer } from './store/reservation/reservation.reducer';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    ReservationComponent,
    RoomListComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    SharedModule,
     StoreModule.forFeature('reservation', reservationReducer)
  ]
})
export class ReservationModule { }
