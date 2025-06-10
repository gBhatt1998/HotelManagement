import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
   constructor( private authService:AuthService,private router:Router){}


   logout() {
    this.authService.logout();
    // Redirect to login page after logout
    this.router.navigate(['/login']);
}
}