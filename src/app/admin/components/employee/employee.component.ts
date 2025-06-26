import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';

import { EmployeeResponseDTO, EmployeeRequestDTO } from 'src/app/admin/models/employeeresponseDTO.model';
import { DepartmentResponseDTO } from 'src/app/admin/models/departmentresponseDTO.model';

import * as EmployeeActions from '../../store/employee/employee.actions';
import { selectAllEmployees } from '../../store/employee/employee.selectors';
import { selectAllDepartments } from '../../store/department/department.selectors';

import { DynamicFormDialogComponent } from 'src/app/shared/components/dynamic-form-dialog/dynamic-form-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  displayedColumns = [
    { key: 'id', label: 'Employee ID' },
    { key: 'name', label: 'Employee Name' },
    { key: 'position', label: 'Position' },
    { key: 'hireDate', label: 'Hire Date' },
    { key: 'departments', label: 'Department' }
  ];
  
  employees$: Observable<EmployeeResponseDTO[]> = this.store.select(selectAllEmployees);
  departments$: Observable<DepartmentResponseDTO[]> = this.store.select(selectAllDepartments);

  constructor(private store: Store, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees());
    this.store.dispatch({ type: '[Department] Load Departments' });
  }

  openCreateDialog(): void {
    this.departments$.pipe(take(1)).subscribe(departments => {
      const departmentOptions = departments.map(dep => ({
        label: dep.name,
        value: dep.id
      }));

      const dialogRef = this.dialog.open(DynamicFormDialogComponent, {
        width: '500px',
        data: {
          formTitle: 'Create Employee',
          moduleName: 'Employee',
          isEdit: false,
          formFields: [
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'position', label: 'Position', type: 'text' },
            { key: 'hireDate', label: 'Hire Date', type: 'date' },
            {
              key: 'departmentIds',
              label: 'Departments',
              type: 'multiselect',
              options: departmentOptions
            }
          ]
        }
      });

      dialogRef.afterClosed().subscribe((result: EmployeeRequestDTO) => {
        if (result) {
          this.store.dispatch(EmployeeActions.createEmployee({ employee: result }));
        }
      });
    });
  }

  openEditDialog(employee: EmployeeResponseDTO): void {
    this.departments$.pipe(take(1)).subscribe(departments => {
      const departmentNameToIdMap: { [name: string]: number } = {};
      departments.forEach(dep => departmentNameToIdMap[dep.name] = dep.id);

      const departmentOptions = departments.map(dep => ({
        label: dep.name,
        value: dep.id
      }));

      const dialogRef = this.dialog.open(DynamicFormDialogComponent, {
        width: '500px',
        data: {
          formTitle: 'Edit Employee',
          moduleName: 'Employee',
          isEdit: true,
          formFields: [
            { key: 'name', label: 'Name', type: 'text', value: employee.name },
            { key: 'position', label: 'Position', type: 'text', value: employee.position },
            { key: 'hireDate', label: 'Hire Date', type: 'date', value: employee.hireDate },
            {
              key: 'departmentIds',
              label: 'Departments',
              type: 'multiselect',
              options: departmentOptions,
              value: employee.departments.map(dep => departmentNameToIdMap[dep])
            }
          ]
        }
      });

      dialogRef.afterClosed().subscribe((result: EmployeeRequestDTO) => {
        if (result) {
          this.store.dispatch(EmployeeActions.updateEmployee({ id: employee.id, employee: result }));
        }
      });
    });
  }

  deleteEmployee(id: number): void {
    this.store.dispatch(EmployeeActions.deleteEmployee({ id }));
  }
}
