import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { CreateDepartmentDTO, DepartmentResponseDTO } from 'src/app/shared/models/departmentresponseDTO.model';
import * as DepartmentActions from '../store/department/department.actions';
import { selectAllDepartments } from '../store/department/department.selectors';
import { DynamicFormDialogComponent } from 'src/app/shared/dynamic-form-dialog/dynamic-form-dialog.component'; 

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit {
  departments$: Observable<DepartmentResponseDTO[]>;
  displayedColumns = ['id', 'name'];

  constructor(private store: Store, private dialog: MatDialog) {
    this.departments$ = this.store.select(selectAllDepartments);
  }

  ngOnInit(): void {
    this.store.dispatch(DepartmentActions.loadDepartments());
  }

  

   
  onDelete(department: DepartmentResponseDTO): void {
    this.store.dispatch(DepartmentActions.deleteDepartment({ id: department.id }));
  }
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormDialogComponent, {
      data: {
        title: 'Create Department',
        formFields: [
          { key: 'name', label: 'Name', type: 'text', required: true }
        ],
        isEdit: false,
        moduleName: 'Department',
        formTitle: 'Create Department',
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: CreateDepartmentDTO | null) => {
      if (result) {
        // Ensure 'result' contains only { name: string }
        console.log('Create payload:', result); // Check for extra fields like `id`

        this.store.dispatch(DepartmentActions.createDepartment({ department: result }));
      }
    });
  }
  

  onEdit(department: DepartmentResponseDTO): void {
    const dialogRef = this.dialog.open(DynamicFormDialogComponent, {
      data: {
        formTitle: 'Edit Department',
        formFields: [
          { key: 'name', label: 'Name', type: 'text', value: department.name }
        ],
        isEdit: true,
        moduleName: 'Department'
      }
    });

    dialogRef.afterClosed().subscribe((result: CreateDepartmentDTO | null) => {
      if (result) {
        const updated: DepartmentResponseDTO = { ...department, ...result };
        this.store.dispatch(DepartmentActions.updateDepartment({ department: updated }));
      }
    });
  }
  
}
