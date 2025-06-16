import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RevenueAggregation } from '../shared/models/RevenueAggregation.model';

@Injectable({ providedIn: 'root' })
export class RevenueService {
  private baseUrl = 'http://localhost:8080/admin/analytics/revenue'; // Adjust the base URL as needed

  constructor(private http: HttpClient) { }

  getMonthlyRevenue(): Observable<RevenueAggregation[]> {
    return this.http.get<RevenueAggregation[]>(`${this.baseUrl}/monthly`);
  }

  getWeeklyRevenue(): Observable<RevenueAggregation[]> {
    return this.http.get<RevenueAggregation[]>(`${this.baseUrl}/weekly`);
  }
}