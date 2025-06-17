import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { GuestDetails } from './guest/guest/guest.model';
import { Store } from '@ngrx/store';
import { setGuestDetails } from './guest/guest/store/guest.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private authService: AuthService,private route:Router, private store:Store) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getRole();

     // Restore guest details from localStorage if present
  const storedGuest = localStorage.getItem('guestDetails');
  if (storedGuest) {
    const guest: GuestDetails = JSON.parse(storedGuest);
    this.store.dispatch(setGuestDetails({ guest }));
  }


    this.authService.getLoggedInStatus().subscribe(status => {
      this.isLoggedIn = status;
      this.userRole = this.authService.getRole();
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userRole = null;
      localStorage.removeItem('guestDetails');  // 🧹 clear guest info
  this.route.navigate(['/login']);
  }
}
