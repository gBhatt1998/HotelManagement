import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DepartmentComponent } from './components/department/department.component';
import { departmentReducer } from './store/department/department.reducer';
import { DepartmentEffects } from './store/department/department.effects';
import { EmployeeComponent } from './components/employee/employee.component';
import { employeeReducer } from './store/employee/employee.reducer';
import { EmployeeEffects } from './store/employee/employee.effects';
import { RoomTypeComponent } from './components/room-type/room-type.component';
import { roomTypeReducer } from './store/room-type/room-type.reducer';
import { RoomTypeEffects } from './store/room-type/room-type.effects';
import { RoomComponent } from './components/room/room.component';
import { roomReducer } from './store/room/room.reducer';
import { RoomEffects } from './store/room/room.effects';
import { RevenueComponent } from './components/revenue/revenue.component';
import { revenueReducer } from './store/revenue/revenue.reducer';
import { RevenueEffects } from './store/revenue/revenue.effects';
// import { BookingCalendarModule } from './dashboard/booking-calendar/booking-calendar.module';
import { reservationReducer } from './store/resevation/reservation.reducer';
import { ReservationEffects } from './store/resevation/reservation.effects';
import { BookingBarComponent } from './components/booking-bar/booking-bar.component';
import { BookingCalendarComponent } from './components/booking-calendar/booking-calendar.component';
import { BookingDialogComponent } from './components/booking-dialog/booking-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DepartmentComponent,
    EmployeeComponent,
    RoomTypeComponent,
    RoomComponent,
    RevenueComponent,
  BookingBarComponent,
BookingCalendarComponent,
BookingDialogComponent  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    //  BookingCalendarModule,
      // StoreModule.forFeature('allReservations', reservationReducer),
    StoreModule.forFeature('departments', departmentReducer),
    StoreModule.forFeature('employees', employeeReducer),
      StoreModule.forFeature('roomTypes', roomTypeReducer),  
       StoreModule.forFeature('rooms', roomReducer),
    StoreModule.forFeature('revenue', revenueReducer),

    StoreModule.forFeature('calendarReservations', reservationReducer),
        EffectsModule.forFeature([ReservationEffects]),
    EffectsModule.forFeature([RevenueEffects]),
    EffectsModule.forFeature([EmployeeEffects]) ,
    EffectsModule.forFeature([RoomEffects]),
    EffectsModule.forFeature([RoomTypeEffects]),
    // EffectsModule.forFeature([ReservationEffects]),
    EffectsModule.forFeature([DepartmentEffects]),
   


  ]
})
export class AdminModule { }
