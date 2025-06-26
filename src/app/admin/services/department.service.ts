
// ===== department.service.ts =====
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentResponseDTO, CreateDepartmentDTO }  from 'src/app/admin/models/departmentresponseDTO.model';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private readonly baseUrl = 'http://localhost:8080/departments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<DepartmentResponseDTO[]> {
    return this.http.get<DepartmentResponseDTO[]>(this.baseUrl);
  }

  create(dept: CreateDepartmentDTO): Observable<DepartmentResponseDTO> {
    return this.http.post<DepartmentResponseDTO>(this.baseUrl, dept);
  }

  update(dept: DepartmentResponseDTO): Observable<DepartmentResponseDTO> {
    return this.http.put<DepartmentResponseDTO>(`${this.baseUrl}/${dept.id}`, dept);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
