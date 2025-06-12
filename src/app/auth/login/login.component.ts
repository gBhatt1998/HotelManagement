import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
  if (this.loginForm.invalid) return;

  const { email, password } = this.loginForm.value;
  this.authService.login(email, password).subscribe({
    next: (res) => {
      localStorage.setItem('jwt', res.jwt);
      localStorage.setItem('role', res.role);
      console.log('token:', res.jwt);
      console.log('Role:', res.role );

      this.authService.notifyLogin(); // Add this line

      if (res.role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/guest']);
      }
    },
    error: () => {
      this.loginError = 'Invalid email or password.';
    }
  });
}

}
