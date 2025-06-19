import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reservationdetailsresponse } from 'src/app/shared/models/reservationdetailsresponse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllReservationService {
  private baseUrl = 'http://localhost:8080/admin/allreservation'; 
private deleteUrl = 'http://localhost:8080/admin'; // Base URL for delete operation
  constructor(private http: HttpClient) {}

  // getAllReservations(): Observable<reservationdetailsresponse[]> {
  //   return this.http.get<reservationdetailsresponse[]>(this.baseUrl);
  // }
getAllReservations(roomType?: string): Observable<reservationdetailsresponse[]> {
  const options = roomType ? { params: { roomType } } : {};
  return this.http.get<reservationdetailsresponse[]>(this.baseUrl, options);
}

  deleteReservation(id: number): Observable<{ status: string, message: string, data: string }> {
  return this.http.delete<{ status: string, message: string, data: string }>(
    `${this.deleteUrl}/${id}/delete`
  );
}


}
