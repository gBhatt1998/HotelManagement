import { createReducer, on } from '@ngrx/store';
import * as EmployeeActions from './employee.actions';
import { EmployeeResponseDTO } from 'src/app/shared/models/employeeresponseDTO.model';

export interface EmployeeState {
    employees: EmployeeResponseDTO[];
    error: string | null;
}

const initialState: EmployeeState = {
    employees: [],
    error: null
};

export const employeeReducer = createReducer(
    initialState,
    on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({ ...state, employees })),
    on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({ ...state, error })),

    on(EmployeeActions.createEmployeeSuccess, (state, { employee }) => ({ ...state, employees: [...state.employees, employee] })),
    on(EmployeeActions.createEmployeeFailure, (state, { error }) => ({ ...state, error })),

    on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
        ...state,
        employees: state.employees.map(e => e.id === employee.id ? employee : e)
    })),
    on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({ ...state, error })),

    on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({
        ...state,
        employees: state.employees.filter(e => e.id !== id)
    })),
    on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({ ...state, error }))
);
