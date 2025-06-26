import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './components/reservation/reservation.component';
import { SharedModule } from '../shared/shared.module';
import { RoomListComponent } from './components/room-list/room-list.component';

import { reservationReducer } from './store/reservation/reservation.reducer';
import { StoreModule } from '@ngrx/store';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';


@NgModule({
  declarations: [
    ReservationComponent,
    RoomListComponent,
    HotelCardComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    SharedModule,
     StoreModule.forFeature('reservation', reservationReducer)
  ]
})
export class ReservationModule { }
