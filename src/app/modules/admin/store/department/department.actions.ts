// ===== department.actions.ts =====
import { createAction, props } from '@ngrx/store';
import { DepartmentResponseDTO, CreateDepartmentDTO }  from 'src/app/modules/admin/models/departmentresponseDTO.model';

export const loadDepartments = createAction('[Department] Load Departments');
export const loadDepartmentsSuccess = createAction('[Department] Load Departments Success', props<{ departments: DepartmentResponseDTO[] }>());
export const loadDepartmentsFailure = createAction('[Department] Load Departments Failure', props<{ error: string }>());

export const createDepartment = createAction('[Department] Create Department', props<{ department: CreateDepartmentDTO }>());
export const createDepartmentSuccess = createAction('[Department] Create Department Success', props<{ department: DepartmentResponseDTO }>());
export const createDepartmentFailure = createAction('[Department] Create Department Failure', props<{ error: string }>());

export const updateDepartment = createAction('[Department] Update Department', props<{ department: DepartmentResponseDTO }>());
export const updateDepartmentSuccess = createAction('[Department] Update Department Success', props<{ department: DepartmentResponseDTO }>());
export const updateDepartmentFailure = createAction('[Department] Update Department Failure', props<{ error: string }>());

export const deleteDepartment = createAction('[Department] Delete Department', props<{ id: number }>());
export const deleteDepartmentSuccess = createAction('[Department] Delete Department Success', props<{ id: number }>());
export const deleteDepartmentFailure = createAction('[Department] Delete Department Failure', props<{ error: string }>());
