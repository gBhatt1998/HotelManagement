import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentResponseDTO } from 'src/app/shared/models/departmentresponseDTO.model';
import { loadDepartments } from '../store/department/department.actions';
import { Store } from '@ngrx/store';
import { selectAllDepartments } from '../store/department/department.selectors';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  departments$!: Observable<DepartmentResponseDTO[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadDepartments());
    this.departments$ = this.store.select(selectAllDepartments);
  }

}
