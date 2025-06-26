import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Room } from './models/room.model';
import { ApiResponse } from '../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class RoomlistService {

  private baseUrl = 'http://localhost:8080/room-numbers/available'; 
  constructor(private http: HttpClient) {}

  getAllAvailableRooms(): Observable<Room[]> {
    return this.http.get<ApiResponse<Room[]>>(`${this.baseUrl}`).pipe(
      map(response => {
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid room data from server.');
        }
        return response.data;
      })
    );
  }

  getAvailableRoomsByDate(checkIn: string, checkOut: string): Observable<Room[]> {
    return this.http
      .get<ApiResponse<Room[]>>(
        `${this.baseUrl}/by-date?checkIn=${checkIn}&checkOut=${checkOut}`
      )
      .pipe(
        map(response => {
          if (!response.data || !Array.isArray(response.data)) {
            throw new Error('Invalid room data from server.');
          }
          return response.data;
        })
      );
  }
}