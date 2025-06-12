
import { createAction, props } from '@ngrx/store';
import { EmployeeRequestDTO, EmployeeResponseDTO } from 'src/app/shared/models/employeeresponseDTO.model';

export const loadEmployees = createAction('[Employee] Load Employees');
export const loadEmployeesSuccess = createAction('[Employee] Load Employees Success', props<{ employees: EmployeeResponseDTO[] }>());
export const loadEmployeesFailure = createAction('[Employee] Load Employees Failure', props<{ error: string }>());

export const createEmployee = createAction('[Employee] Create Employee', props<{ employee: EmployeeRequestDTO }>());
export const createEmployeeSuccess = createAction('[Employee] Create Employee Success', props<{ employee: EmployeeResponseDTO }>());
export const createEmployeeFailure = createAction('[Employee] Create Employee Failure', props<{ error: string }>());

export const updateEmployee = createAction('[Employee] Update Employee', props<{ id: number, employee: EmployeeRequestDTO }>());
export const updateEmployeeSuccess = createAction('[Employee] Update Employee Success', props<{ employee: EmployeeResponseDTO }>());
export const updateEmployeeFailure = createAction('[Employee] Update Employee Failure', props<{ error: string }>());

export const deleteEmployee = createAction('[Employee] Delete Employee', props<{ id: number }>());
export const deleteEmployeeSuccess = createAction('[Employee] Delete Employee Success', props<{ id: number }>());
export const deleteEmployeeFailure = createAction('[Employee] Delete Employee Failure', props<{ error: string }>());

