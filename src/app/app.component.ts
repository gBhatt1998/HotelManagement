import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private authService: AuthService,private route:Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getRole();

    this.authService.getLoggedInStatus().subscribe(status => {
      this.isLoggedIn = status;
      this.userRole = this.authService.getRole();
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userRole = null;
  this.route.navigate(['/login']);
  }
}
