import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GuestReservationsResponse } from '../components/guest/guest.model'; 

@Injectable({ providedIn: 'root' })
export class GuestService {
  private apiUrl = 'http://localhost:8080/guest/reservations';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<GuestReservationsResponse> {
    return this.http.get<GuestReservationsResponse>(this.apiUrl);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}