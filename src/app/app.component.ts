import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { GuestDetails } from './modules/guest/components/guest/guest.model';
import { Store } from '@ngrx/store';
import { setGuestDetails } from './modules/guest/store/guest.actions';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isLoggedIn = false;
  userRole: string | null = null;
  menuOpen = false;
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

    this.route.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe(() => {
    this.menuOpen = false;
  });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userRole = null;
      localStorage.removeItem('guestDetails');  // 🧹 clear guest info
  this.route.navigate(['/login']);
  }



toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

closeMenu() {
  this.menuOpen = false;
}
}
