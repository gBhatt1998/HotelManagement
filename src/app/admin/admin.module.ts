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
import { departmentReducer } from './store/department/department.reducer';
import { DepartmentEffects } from './store/department/department.effects';
import { EmployeeComponent } from './employee/employee.component';
import { employeeReducer } from './store/employee/employee.reducer';
import { EmployeeEffects } from './store/employee/employee.effects';
import { RoomTypeComponent } from './room-type/room-type.component';
import { roomTypeReducer } from './store/room-type/room-type.reducer';
import { RoomTypeEffects } from './store/room-type/room-type.effects';
import { RoomComponent } from './room/room.component';
import { roomReducer } from './store/room/room.reducer';
import { RoomEffects } from './store/room/room.effects';
import { RevenueComponent } from './revenue/revenue.component';
import { revenueReducer } from './store/revenue/revenue.reducer';
import { RevenueEffects } from './store/revenue/revenue.effects';


@NgModule({
  declarations: [
    DashboardComponent,
    AllReservationsComponent,
    DepartmentComponent,
    EmployeeComponent,
    RoomTypeComponent,
    RoomComponent,
    RevenueComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
      StoreModule.forFeature('allReservations', reservationReducer),
    StoreModule.forFeature('departments', departmentReducer),
    StoreModule.forFeature('employees', employeeReducer),
      StoreModule.forFeature('roomTypes', roomTypeReducer),  
       StoreModule.forFeature('rooms', roomReducer),
    StoreModule.forFeature('revenue', revenueReducer),
    EffectsModule.forFeature([RevenueEffects]),
    EffectsModule.forFeature([EmployeeEffects]) ,
    EffectsModule.forFeature([RoomEffects]),
    EffectsModule.forFeature([RoomTypeEffects]),
    EffectsModule.forFeature([ReservationEffects]),
    EffectsModule.forFeature([DepartmentEffects]),

  ]
})
export class AdminModule { }
