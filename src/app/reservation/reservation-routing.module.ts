import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './components/reservation/reservation.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';

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
