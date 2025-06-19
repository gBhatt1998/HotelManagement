import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from './models/service.model';
import { ApiResponse } from '../shared/models/api-response.model';
import { reservationdetailsresponse } from '../shared/models/reservationdetailsresponse.model';
import { ReservationConfirmationPayload } from './models/ReservationConfirmationPayload.model';

@Injectable({
  providedIn: 'root'
})
export class HotelCardService {

 private apiUrl = 'http://localhost:8080/reservation/services'; 
 private bookingApiUrl = 'http://localhost:8080/reservation/confirmed'; 
  constructor(private http: HttpClient) { }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }
  confirmReservation(payload: any ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.bookingApiUrl, payload);
  }

}
