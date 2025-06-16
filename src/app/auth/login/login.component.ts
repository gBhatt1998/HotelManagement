import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupRequest } from 'src/app/shared/models/signup-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authForm!: FormGroup;
  loginError: string = '';
  isLoginMode: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      name: [''],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['GUEST']
    });
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.loginError = '';

    if (this.isLoginMode) {
      this.authForm.get('name')?.clearValidators();
      this.authForm.get('phone')?.clearValidators();
      this.authForm.get('role')?.clearValidators();
    } else {
      this.authForm.get('name')?.setValidators([Validators.required]);
      this.authForm.get('phone')?.setValidators([
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]);
      this.authForm.get('role')?.setValidators([Validators.required]);
    }

    this.authForm.get('name')?.updateValueAndValidity();
    this.authForm.get('phone')?.updateValueAndValidity();
    this.authForm.get('role')?.updateValueAndValidity();
  }

  
onSubmit(): void {
  if (this.authForm.invalid) return;

  const { name, phone, email, password, role } = this.authForm.value;

  if (this.isLoginMode) {
    this.authService.login(email, password).subscribe({
      next: (res) => {
        localStorage.setItem('jwt', res.jwt);
        this.authService.notifyLogin();
        const userRole = this.authService.getRole();
        this.router.navigate([userRole === 'ROLE_ADMIN' ? '/admin' : '/guest']);
      },
      error: () => this.loginError = 'Invalid email or password.'
    });
  } else {
    const signupData: SignupRequest = { name, phone, email, password, role };

    this.authService.signup(signupData).subscribe({
      next: () => this.toggleMode(),
      error: () => this.loginError = 'Signup failed. Please try again.'
    });
  }
}
}
