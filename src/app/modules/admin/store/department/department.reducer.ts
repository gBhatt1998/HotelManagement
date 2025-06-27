import { createReducer, on } from '@ngrx/store';
import * as DepartmentActions from './department.actions';
import { DepartmentResponseDTO } from 'src/app/modules/admin/models/departmentresponseDTO.model';

export interface DepartmentState {
  departments: DepartmentResponseDTO[];
  loading: boolean;
  error: string | null;
}

export const initialState: DepartmentState = {
  departments: [],
  loading: false,
  error: null
};

export const departmentReducer = createReducer(
  initialState,
  on(DepartmentActions.loadDepartments, state => ({ ...state, loading: true })),
  on(DepartmentActions.loadDepartmentsSuccess, (state, { departments }) => ({
    ...state,
    departments,
    loading: false,
    error: null
  })),
  on(DepartmentActions.loadDepartmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
