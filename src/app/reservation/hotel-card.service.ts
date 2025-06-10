import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from './models/service.model';

@Injectable({
  providedIn: 'root'
})
export class HotelCardService {

 private apiUrl = 'http://localhost:8080/reservation/allServices'; 

  constructor(private http: HttpClient) { }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }
}
