import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

isAuthenticated = false; // This should be set based on the login response or token validation

  private apiUrl = 'http://localhost:8080/api/auth';
  constructor( private http:HttpClient) { }


  login(email: string, password: string): Observable<{ jwt: string, role: string }> {
    return this.http.post<{ jwt: string, role: string }>(`${this.apiUrl}/login`, { email, password });
  }

    logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  sAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
