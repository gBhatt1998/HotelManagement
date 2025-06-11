
// ===== department.reducer.ts =====
import { createReducer, on } from '@ngrx/store';
import { DepartmentResponseDTO, CreateDepartmentDTO }  from 'src/app/shared/models/departmentresponseDTO.model';
import * as DepartmentActions from './department.actions';

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
  on(DepartmentActions.loadDepartmentsSuccess, (state, { departments }) => ({ ...state, loading: false, departments })),
  on(DepartmentActions.loadDepartmentsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(DepartmentActions.createDepartmentSuccess, (state, { department }) => ({ ...state, departments: [...state.departments, department] })),
  on(DepartmentActions.updateDepartmentSuccess, (state, { department }) => ({
    ...state,
    departments: state.departments.map(d => d.id === department.id ? department : d)
  })),
  on(DepartmentActions.deleteDepartmentSuccess, (state, { id }) => ({
    ...state,
    departments: state.departments.filter(d => d.id !== id)
  }))
);