import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from './models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomlistService {

  private baseUrl = 'http://localhost:8080/reservation'; 
  constructor(private http: HttpClient) {}

  getAllAvailableRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/rooms/available/types`);
  }

  getAvailableRoomsByDate(checkIn: string, checkOut: string): Observable<Room[]> {
    return this.http.get<Room[]>(
      `${this.baseUrl}/rooms/available/by-date?checkIn=${checkIn}&checkOut=${checkOut}`
    );
  }
}
