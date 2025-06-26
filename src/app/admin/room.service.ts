import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomRequestDTO, RoomResponseDTO } from '../shared/models/room.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private apiUrl = 'http://localhost:8080/rooms';

  constructor(private http: HttpClient) {}

  getAll(roomType: string = ''): Observable<RoomResponseDTO[]> {
  const url = roomType
    ? `${this.apiUrl}?roomType=${encodeURIComponent(roomType)}`
    : this.apiUrl;
  return this.http.get<RoomResponseDTO[]>(url);
}

  create(room: RoomRequestDTO): Observable<RoomResponseDTO> {
    return this.http.post<RoomResponseDTO>(`${this.apiUrl}`, room);
  }

  delete(roomNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${roomNo}`);
  }

  createMultipleRooms(rooms: RoomRequestDTO[]): Observable<RoomResponseDTO[]> {
    return this.http.post<RoomResponseDTO[]>(`${this.apiUrl}/batch`, { rooms });
  }
  
  

 
  suggestRoomNumbers(roomTypeId: number, baseRoomNo: number, count: number): Observable<number[]> {
  return this.http.get<number[]>(
    `${this.apiUrl}/suggest-room-numbers?roomTypeId=${roomTypeId}&baseRoomNo=${baseRoomNo}&count=${count}`
  );
}

}
