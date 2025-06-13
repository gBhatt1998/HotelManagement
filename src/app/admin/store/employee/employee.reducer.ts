import { createReducer, on } from '@ngrx/store';
import * as EmployeeActions from './employee.actions';
import { EmployeeResponseDTO } from 'src/app/shared/models/employeeresponseDTO.model';

export interface EmployeeState {
    employees: EmployeeResponseDTO[];
    error: string | null;
}

const initialState: EmployeeState = {
    employees: [],
    error: null,
};

export const employeeReducer = createReducer(
    initialState,

    // Main state update from all success scenarios
    on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
        ...state,
        employees,
        error: null
    })),

    // Handle any failure (used after create/update/delete/load)
    on(
        EmployeeActions.loadEmployeesFailure,
        EmployeeActions.createEmployeeFailure,
        EmployeeActions.updateEmployeeFailure,
        EmployeeActions.deleteEmployeeFailure,
        (state, { error }) => ({
            ...state,
            error,
        })
    )
);
