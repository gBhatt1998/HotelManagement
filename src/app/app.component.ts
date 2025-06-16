import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hotelManagement';
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
    this.authService.getLoggedInStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  

  logout() {
    this.authService.logout();
     this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
