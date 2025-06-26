import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { authGuard } from '../guard/auth.guard';

const routes: Routes = [
 { path: 'login', component:LoginComponent,canActivate:[authGuard]},
 { path:'unauthorized',component:UnauthorizedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
