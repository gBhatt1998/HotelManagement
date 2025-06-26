import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as EmployeeActions from './employee.actions';
import { EmployeeService } from '../../services/employee.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Injectable()
export class EmployeeEffects {
    constructor(
        private actions$: Actions,
        private employeeService: EmployeeService,
        private dialogService: DialogService
    ) { }

    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.loadEmployees),
            mergeMap(() =>
                this.employeeService.getAllEmployees().pipe(
                    map(employees => EmployeeActions.loadEmployeesSuccess({ employees })),
                    catchError(error => {
                        this.dialogService.openError({
                            title: 'Load Failed',
                            message: error?.error?.message || 'Failed to load employees.',
                        });
                        return of(EmployeeActions.loadEmployeesFailure({ error: error.message }));
                    })
                )
            )
        )
    );

    createEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.createEmployee),
            mergeMap(({ employee }) =>
                this.employeeService.createEmployee(employee).pipe(
                    switchMap(() => this.employeeService.getAllEmployees()),
                    map(employees => {
                        this.dialogService.openSuccess({
                            title: 'Employee Created',
                            message: `Employee '${employee.name}' created successfully.`,
                        });
                        return EmployeeActions.loadEmployeesSuccess({ employees });
                    }),
                    catchError(error => {
                        this.dialogService.openError({
                            title: 'Creation Failed',
                            message: error?.error?.message || 'Could not create employee.',
                        });
                        return of(EmployeeActions.createEmployeeFailure({ error: error.message }));
                    })
                )
            )
        )
    );

    updateEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.updateEmployee),
            mergeMap(({ id, employee }) =>
                this.employeeService.updateEmployee(id, employee).pipe(
                    switchMap(() => this.employeeService.getAllEmployees()),
                    map(employees => {
                        this.dialogService.openSuccess({
                            title: 'Employee Updated',
                            message: `Employee '${employee.name}' updated successfully.`,
                        });
                        return EmployeeActions.loadEmployeesSuccess({ employees });
                    }),
                    catchError(error => {
                        this.dialogService.openError({
                            title: 'Update Failed',
                            message: error?.error?.message || 'Could not update employee.',
                        });
                        return of(EmployeeActions.updateEmployeeFailure({ error: error.message }));
                    })
                )
            )
        )
    );

    deleteEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActions.deleteEmployee),
            mergeMap(({ id }) =>
                this.employeeService.deleteEmployee(id).pipe(
                    switchMap(() => this.employeeService.getAllEmployees()),
                    map(employees => {
                        this.dialogService.openSuccess({
                            title: 'Employee Deleted',
                            message: `Employee deleted successfully.`,
                        });
                        return EmployeeActions.loadEmployeesSuccess({ employees });
                    }),
                    catchError(error => {
                        this.dialogService.openError({
                            title: 'Deletion Failed',
                            message: error?.error?.message || 'Could not delete employee.',
                        });
                        return of(EmployeeActions.deleteEmployeeFailure({ error: error.message }));
                    })
                )
            )
        )
    );
}
