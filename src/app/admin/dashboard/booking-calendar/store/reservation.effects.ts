import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardReservationService } from '../../dashboard.service';
import * as ReservationActions from 'src/app/admin/dashboard/booking-calendar/store/reservation.actions';
import { DialogService } from 'src/app/shared/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Injectable()
export class ReservationEffects {
  private loadingRef: MatDialogRef<DialogComponent> | null = null;

  constructor(
    private actions$: Actions,
    private reservationService: DashboardReservationService,
    private dialogService: DialogService
  ) {}

  loadFilteredReservations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.loadFilteredReservations),

      // 👉 Show loading spinner when action is dispatched
      tap(() => {
        this.loadingRef = this.dialogService.openLoading('Fetching reservations...', 'Please wait');
      }),

switchMap(({ roomTypeName, dateFilter, month, year }) =>
  this.reservationService.getFilteredReservations(roomTypeName, dateFilter, month, year).pipe(
          map((reservations) =>
            ReservationActions.loadFilteredReservationsSuccess({ reservations })
          ),
          catchError((error) =>
            of(ReservationActions.loadFilteredReservationsFailure({ error }))
          ),
          // 👉 Close loading spinner regardless of success/failure
          finalize(() => {
            if (this.loadingRef) {
              this.loadingRef.close();
              this.loadingRef = null;
            }
          })
        )
      )
    )
  );
}
