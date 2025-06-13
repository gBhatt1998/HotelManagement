import { createReducer, on } from '@ngrx/store';
import { DepartmentResponseDTO } from 'src/app/shared/models/departmentresponseDTO.model';
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

  // Load Departments
  on(DepartmentActions.loadDepartments, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DepartmentActions.loadDepartmentsSuccess, (state, { departments }) => ({
    ...state,
    loading: false,
    departments
  })),
  on(DepartmentActions.loadDepartmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create Department
  on(DepartmentActions.createDepartment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DepartmentActions.createDepartmentSuccess, (state, { department }) => ({
    ...state,
    loading: false,
    departments: [...state.departments, department]
  })),
  on(DepartmentActions.createDepartmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Department
  on(DepartmentActions.updateDepartment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DepartmentActions.updateDepartmentSuccess, (state, { department }) => ({
    ...state,
    loading: false,
    departments: state.departments.map(d =>
      d.id === department.id ? department : d
    )
  })),
  on(DepartmentActions.updateDepartmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Department
  on(DepartmentActions.deleteDepartment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DepartmentActions.deleteDepartmentSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    departments: state.departments.filter(d => d.id !== id)
  })),
  on(DepartmentActions.deleteDepartmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
