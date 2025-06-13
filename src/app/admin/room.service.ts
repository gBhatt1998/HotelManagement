import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomRequestDTO, RoomResponseDTO } from '../shared/models/room.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private apiUrl = 'http://localhost:8080/admin/rooms';

  constructor(private http: HttpClient) {}

  getAll(): Observable<RoomResponseDTO[]> {
    return this.http.get<RoomResponseDTO[]>(`${this.apiUrl}`);
  }

  create(room: RoomRequestDTO): Observable<RoomResponseDTO> {
    return this.http.post<RoomResponseDTO>(`${this.apiUrl}`, room);
  }

  delete(roomNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${roomNo}`);
  }

  suggestNextRoomNumber(roomTypeId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/suggest-next/${roomTypeId}`);
  }
}
