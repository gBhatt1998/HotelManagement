import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomType } from '../../shared/models/room-type.model';

@Injectable({ providedIn: 'root' })
export class RoomTypeService {
  private apiUrl = 'http://localhost:8080/room-types';

  constructor(private http: HttpClient) { }

  getRoomTypes(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(this.apiUrl);
  }

  addRoomType(roomType: Partial<RoomType>): Observable<RoomType> {
    return this.http.post<RoomType>(this.apiUrl, roomType);
  }

  updateRoomType(id: number, roomType: Partial<RoomType>): Observable<RoomType> {
    return this.http.put<RoomType>(`${this.apiUrl}/${id}`, roomType);
  }

  deleteRoomType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
