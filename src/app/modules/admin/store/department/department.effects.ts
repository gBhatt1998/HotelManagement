import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as DepartmentActions from './department.actions';
import { DepartmentService } from '../../services/department.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Injectable()
export class DepartmentEffects {
  constructor(
    private actions$: Actions,
    private departmentService: DepartmentService,
    private dialogService: DialogService
  ) {}

  loadDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.loadDepartments),
      mergeMap(() =>
        this.departmentService.getAll().pipe(
          map(departments => DepartmentActions.loadDepartmentsSuccess({ departments })),
          catchError(error => {
            this.dialogService.openError({
              title: 'Load Failed',
              message: error?.error?.message || 'Failed to load departments.',
            });
            return of(DepartmentActions.loadDepartmentsFailure({ error: error.message }));
          })
        )
      )
    )
  );

  createDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.createDepartment),
      mergeMap(({ department }) =>
        this.departmentService.create(department).pipe(
          switchMap(() => this.departmentService.getAll()),
          map(departments => {
            this.dialogService.openSuccess({
              title: 'Department Created',
              message: `Department '${department.name}' created successfully.`,
            });
            return DepartmentActions.loadDepartmentsSuccess({ departments });
          }),
          catchError(error => {
            this.dialogService.openError({
              title: 'Creation Failed',
              message: error?.error?.message || 'Could not create department.',
            });
            return of(DepartmentActions.createDepartmentFailure({ error: error.message }));
          })
        )
      )
    )
  );

  updateDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.updateDepartment),
      mergeMap(({ department }) =>
        this.departmentService.update(department).pipe(
          switchMap(() => this.departmentService.getAll()),
          map(departments => {
            this.dialogService.openSuccess({
              title: 'Department Updated',
              message: `Department '${department.name}' updated successfully.`,
            });
            return DepartmentActions.loadDepartmentsSuccess({ departments });
          }),
          catchError(error => {
            this.dialogService.openError({
              title: 'Update Failed',
              message: error?.error?.message || 'Could not update department.',
            });
            return of(DepartmentActions.updateDepartmentFailure({ error: error.message }));
          })
        )
      )
    )
  );

  deleteDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.deleteDepartment),
      mergeMap(({ id }) =>
        this.departmentService.delete(id).pipe(
          switchMap(() => this.departmentService.getAll()),
          map(departments => {
            this.dialogService.openSuccess({
              title: 'Department Deleted',
              message: `Department deleted successfully.`,
            });
            return DepartmentActions.loadDepartmentsSuccess({ departments });
          }),
          catchError(error => {
            this.dialogService.openError({
              title: 'Deletion Failed',
              message: error?.error?.message || 'Could not delete department.',
            });
            return of(DepartmentActions.deleteDepartmentFailure({ error: error.message }));
          })
        )
      )
    )
  );
}
