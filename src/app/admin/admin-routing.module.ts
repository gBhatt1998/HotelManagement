import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllReservationsComponent } from './all-reservations/all-reservations.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, // This has the sidebar and <router-outlet>
    children: [
      { path: 'reservations', component: AllReservationsComponent },
       {path: 'department',component:DepartmentComponent},
      { path: 'employee', component: EmployeeComponent },
      
      // Add more routes like:
      // { path: 'guests', component: GuestsComponent },
      // { path: 'rooms', component: RoomsComponent },
      { path: '', redirectTo: 'reservations', pathMatch: 'full' },
     
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
