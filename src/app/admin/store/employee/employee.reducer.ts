import { createReducer, on } from '@ngrx/store';
import * as EmployeeActions from './employee.actions';
import { EmployeeResponseDTO } from 'src/app/shared/models/employeeresponseDTO.model';
export interface EmployeeState {
  employees: EmployeeResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const employeeReducer = createReducer(
  initialState,

  on(EmployeeActions.loadEmployees, (state) => ({ ...state, loading: true })),

  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    loading: false,
    error: null,
  })),

  on(
    EmployeeActions.loadEmployeesFailure,
    EmployeeActions.createEmployeeFailure,
    EmployeeActions.updateEmployeeFailure,
    EmployeeActions.deleteEmployeeFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);
