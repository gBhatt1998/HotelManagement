import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  private apiUrl = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ jwt: string; role: string }> {
    return this.http.post<{ jwt: string; role: string }>(`${this.apiUrl}/login`, { email, password });
  }

    logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwt');
  }

  notifyLogin(): void {
    this.isLoggedInSubject.next(true);
  }
}