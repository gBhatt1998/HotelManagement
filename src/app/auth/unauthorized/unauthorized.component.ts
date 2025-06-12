import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {
  previousUrl: string = '/';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const from = nav?.previousNavigation?.finalUrl?.toString();
    if (from) {
      this.previousUrl = from;
    }
  }

  goBack(): void {
    this.router.navigateByUrl(this.previousUrl);
  }
}