import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomListComponent } from './room-list/room-list.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';

const routes: Routes = [
  {path:'',component:ReservationComponent},{
    path:'list',component:RoomListComponent
  },
  {path:'card',component:HotelCardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
