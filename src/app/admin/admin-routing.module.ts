import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { RoomTypeComponent } from './components/room-type/room-type.component';
import { RoomComponent } from './components/room/room.component';
import { RevenueComponent } from './components/revenue/revenue.component';
import { BookingCalendarComponent } from './components/booking-calendar/booking-calendar.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, // This has the sidebar and <router-outlet>
    children: [
      // { path: 'reservations', component: AllReservationsComponent },
       {path: 'department',component:DepartmentComponent},
      { path: 'employee', component: EmployeeComponent },
      {path:'room-type',component:RoomTypeComponent},
      {path:'room',component:RoomComponent},
      {path:'revenue',component:RevenueComponent},
      { path: 'booking-calendar', component: BookingCalendarComponent },
      { path: '', redirectTo: 'booking-calendar', pathMatch: 'full' },
     
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
