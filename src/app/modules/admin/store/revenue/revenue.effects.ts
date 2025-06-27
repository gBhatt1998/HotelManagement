// revenue.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RevenueActions from './revenue.actions';
import { map, mergeMap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { RevenueService } from '../../services/revenue.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Injectable()
export class RevenueEffects {
    constructor(
        private actions$: Actions,
        private service: RevenueService,
        private dialogService: DialogService
    ) { }
    loadMonthly$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RevenueActions.loadMonthlyRevenue),
            mergeMap(() => {
                const dl = this.dialogService.openLoading('Loading monthly revenue...');
                return this.service.getMonthlyRevenue().pipe(
                    map(data => {
                        dl.close();
                        return RevenueActions.loadRevenueSuccess({ data });
                    }),
                    catchError(error => {
                        dl.close();
                        this.dialogService.openError({ message: error.message });
                        return of(RevenueActions.loadRevenueFailure({ error }));
                    })
                );
            })
        )
    );

    loadWeekly$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RevenueActions.loadWeeklyRevenue),
            mergeMap(() => {
                const dl = this.dialogService.openLoading('Loading weekly revenue...');
                return this.service.getWeeklyRevenue().pipe(
                    map(data => {
                        dl.close();
                        return RevenueActions.loadRevenueSuccess({ data });
                    }),
                    catchError(error => {
                        dl.close();
                        this.dialogService.openError({ message: error.message });
                        return of(RevenueActions.loadRevenueFailure({ error }));
                    })
                );
            })
        )
    );

    
}
