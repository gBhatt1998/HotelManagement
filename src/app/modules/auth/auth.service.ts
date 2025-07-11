import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { GuestDetails } from '../guest/components/guest/guest.model';
import { SignupRequest } from 'src/app/shared/models/signup-request.model';

export interface DecodedToken {
  sub: string;       
  role: string;
  name: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private apiUrl = 'http://localhost:8080/auth'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ jwt: string }> {
    return this.http.post<{ jwt: string }>(`${this.apiUrl}/login`, { email, password });
  }

 signup(data: SignupRequest): Observable<any> {
  return this.http.post(`${this.apiUrl}/signup`, data);
}

  logout(): void {
    localStorage.removeItem('jwt');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwt');
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  notifyLogin(): void {
    this.isLoggedInSubject.next(true);
  }

  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwt_decode<DecodedToken>(token);
    } catch (e) {
      console.error('Invalid JWT token', e);
      return null;
    }
  }

 

  getRole(): string | null {
    return this.getDecodedToken()?.role ?? null;
  }

  storeGuestDetails(details: GuestDetails): void {
  localStorage.setItem('guestDetails', JSON.stringify(details));
}

getStoredGuestDetails(): GuestDetails | null {
  const raw = localStorage.getItem('guestDetails');
  return raw ? JSON.parse(raw) : null;
}

clearGuestDetails(): void {
  localStorage.removeItem('guestDetails');
}

  
}
