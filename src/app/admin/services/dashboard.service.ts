import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationDetailsResponse } from '../models/reservation-details-response.model';

@Injectable({ providedIn: 'root' })
export class DashboardReservationService {
  private baseUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) {}

  getFilteredReservations(
    roomTypeName?: string,
    dateFilter?: 'today' | 'week' | 'month' | 'all',
    month?: number,
    year?: number
  ): Observable<ReservationDetailsResponse[]> {
    let params = new HttpParams();

    if (roomTypeName) {
      params = params.set('roomTypeName', roomTypeName);
    }
    if (dateFilter) {
      params = params.set('dateFilter', dateFilter);
    }
    if (month !== undefined) {
      params = params.set('month', month.toString());
    }
    if (year !== undefined) {
      params = params.set('year', year.toString());
    }

    return this.http.get<ReservationDetailsResponse[]>(`${this.baseUrl}/filtered`, { params });
  }
}
