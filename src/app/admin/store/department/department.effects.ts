// 
import { DepartmentResponseDTO, CreateDepartmentDTO }  from 'src/app/shared/models/departmentresponseDTO.model';
 
// ===== department.effects.ts =====
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { DepartmentService } from './department.service';
import * as DepartmentActions from './department.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DepartmentService } from '../../department.service';
// import { DepartmentResponseDTO } from './department.model';

@Injectable()
export class DepartmentEffects {
  constructor(private actions$: Actions, private departmentService: DepartmentService) {}

  loadDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.loadDepartments),
      mergeMap(() =>
        this.departmentService.getAll().pipe(
          map((departments: DepartmentResponseDTO[]) => DepartmentActions.loadDepartmentsSuccess({ departments })),
          catchError(error => of(DepartmentActions.loadDepartmentsFailure({ error: error.message })))
        )
      )
    )
  );

  createDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.createDepartment),
      mergeMap(({ department }) =>
        this.departmentService.create(department).pipe(
          map((created: DepartmentResponseDTO) => DepartmentActions.createDepartmentSuccess({ department: created })),
          catchError(error => of(DepartmentActions.createDepartmentFailure({ error: error.message })))
        )
      )
    )
  );

  updateDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.updateDepartment),
      mergeMap(({ department }) =>
        this.departmentService.update(department).pipe(
          map((updated: DepartmentResponseDTO) => DepartmentActions.updateDepartmentSuccess({ department: updated })),
          catchError(error => of(DepartmentActions.updateDepartmentFailure({ error: error.message })))
        )
      )
    )
  );

  deleteDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.deleteDepartment),
      mergeMap(({ id }) =>
        this.departmentService.delete(id).pipe(
          map(() => DepartmentActions.deleteDepartmentSuccess({ id })),
          catchError(error => of(DepartmentActions.deleteDepartmentFailure({ error: error.message })))
        )
      )
    )
  );
}