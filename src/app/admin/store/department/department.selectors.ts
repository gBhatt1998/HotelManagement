import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DepartmentState } from './department.reducer';

export const selectDepartmentState = createFeatureSelector<DepartmentState>('departments');

export const selectAllDepartments = createSelector(
  selectDepartmentState,
  (state: DepartmentState) => state.departments
);
