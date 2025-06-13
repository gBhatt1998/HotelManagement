import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as DepartmentActions from './department.actions';
import { DepartmentService } from '../../department.service';
import { DepartmentResponseDTO } from 'src/app/shared/models/departmentresponseDTO.model';
import { DialogService } from 'src/app/shared/dialog.service';

@Injectable()
export class DepartmentEffects {
  constructor(
    private actions$: Actions,
    private departmentService: DepartmentService,
    private dialogService: DialogService
  ) { }


  loadDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.loadDepartments),
      mergeMap(() => {
        const dialogRef = this.dialogService.openLoading('Loading departments...');
        return this.departmentService.getAll().pipe(
          map((departments: DepartmentResponseDTO[]) => {
            dialogRef.close();
            return DepartmentActions.loadDepartmentsSuccess({ departments });
          }),
          catchError(error => {
            dialogRef.close();
            this.dialogService.openError({
              title: 'Load Failed',
              message: error?.error?.message || 'Failed to load departments.',
            });
            return of(DepartmentActions.loadDepartmentsFailure({ error: error.message }));
          })
        );
      })
    )
  );

  createDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.createDepartment),
      mergeMap(({ department }) => {
        const dialogRef = this.dialogService.openLoading('Creating department...');
        return this.departmentService.create(department).pipe(
          map((created: DepartmentResponseDTO) => {
            dialogRef.close();
            this.dialogService.openSuccess({
              title: 'Department Created',
              message: `Department '${created.name}' created successfully.`,
            });
            return DepartmentActions.createDepartmentSuccess({ department: created });
          }),
          catchError(error => {
            dialogRef.close();
            this.dialogService.openError({
              title: 'Creation Failed',
              message: error?.error?.message || 'Could not create department.',
            });
            return of(DepartmentActions.createDepartmentFailure({ error: error.message }));
          })
        );
      })
    )
  );

  updateDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.updateDepartment),
      mergeMap(({ department }) => {
        const dialogRef = this.dialogService.openLoading('Updating department...');
        return this.departmentService.update(department).pipe(
          map((updated: DepartmentResponseDTO) => {
            dialogRef.close();
            this.dialogService.openSuccess({
              title: 'Department Updated',
              message: `Department '${updated.name}' updated successfully.`,
            });
            return DepartmentActions.updateDepartmentSuccess({ department: updated });
          }),
          catchError(error => {
            dialogRef.close();
            this.dialogService.openError({
              title: 'Update Failed',
              message: error?.error?.message || 'Could not update department.',
            });
            return of(DepartmentActions.updateDepartmentFailure({ error: error.message }));
          })
        );
      })
    )
  );

  deleteDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.deleteDepartment),
      mergeMap(({ id }) => {
        const dialogRef = this.dialogService.openLoading('Deleting department...');
        return this.departmentService.delete(id).pipe(
          map(() => {
            dialogRef.close();
            this.dialogService.openSuccess({
              title: 'Department Deleted',
              message: `Department with ID ${id} deleted successfully.`,
            });
            return DepartmentActions.deleteDepartmentSuccess({ id });
          }),
          catchError(error => {
            dialogRef.close();
            this.dialogService.openError({
              title: 'Deletion Failed',
              message: error?.error?.message || 'Could not delete department.',
            });
            return of(DepartmentActions.deleteDepartmentFailure({ error: error.message }));
          })
        );
      })
    )
  );
}  