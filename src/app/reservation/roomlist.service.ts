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
    return this.http.get<Room[]>(`${this.baseUrl}/allAvailableRooms`);
  }

  getAvailableRoomsByDate(checkIn: string, checkOut: string): Observable<Room[]> {
    return this.http.get<Room[]>(
      `${this.baseUrl}/availableRoomsByDate?checkIn=${checkIn}&checkOut=${checkOut}`
    );
  }
}
