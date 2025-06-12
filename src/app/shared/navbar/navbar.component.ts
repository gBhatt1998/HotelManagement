import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // isLoggedIn = false;
  //  constructor( private authService:AuthService,private router:Router){}


  // ngOnInit() {
  //   this.authService.getLoggedInStatus().subscribe((status) => {
  //     this.isLoggedIn = status;
  //   });
  // }

  // logout() {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }
}