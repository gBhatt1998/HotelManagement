import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeResponseDTO, EmployeeRequestDTO } from 'src/app/modules/admin/models/employeeresponseDTO.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<EmployeeResponseDTO[]> {
    return this.http.get<EmployeeResponseDTO[]>(this.apiUrl);
  }

  createEmployee(employee: EmployeeRequestDTO): Observable<string> {
    return this.http.post(this.apiUrl, employee, { responseType: 'text' });
  }

  updateEmployee(id: number, employee: EmployeeRequestDTO): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}`, employee, { responseType: 'text' });
  }

  deleteEmployee(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
