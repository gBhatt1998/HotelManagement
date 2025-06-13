import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DepartmentState } from './department.reducer';

export const selectDepartmentState = createFeatureSelector<DepartmentState>('departments');

export const selectAllDepartments = createSelector(
  selectDepartmentState,
  (state: DepartmentState) => state.departments
);
export const selectDepartmentLoading = createSelector(
  selectDepartmentState,
  (state: DepartmentState) => state.loading
);
export const selectDepartmentError = createSelector(
  selectDepartmentState,
  (state: DepartmentState) => state.error
);