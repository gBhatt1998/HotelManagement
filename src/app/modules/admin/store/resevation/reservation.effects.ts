import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardReservationService } from '../../services/dashboard.service';
import * as ReservationActions from 'src/app/modules/admin/store/resevation/reservation.actions';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

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

    tap(() => {
      this.loadingRef = this.dialogService.openLoading('Fetching reservations...', 'Please wait');
    }),

    switchMap(({ roomTypeName, dateFilter, month, year }) =>
      this.reservationService.getFilteredReservations(roomTypeName, dateFilter, month, year).pipe(
        map((reservations) =>
          ReservationActions.loadFilteredReservationsSuccess({ reservations })
        ),
        catchError((error) => {
          return of(
            ReservationActions.loadFilteredReservationsFailure({ error }),
          );
        }),
        finalize(() => {
          // Always close the spinner
          if (this.loadingRef) {
            this.loadingRef.close();
            this.loadingRef = null;
          }
        })
      )
    )
  )
);

loadFilteredReservationsFailure$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(ReservationActions.loadFilteredReservationsFailure),
      tap(({ error }) => {
        this.dialogService.openError({
          title: 'Reservation Load Failed',
          message: error?.message || 'Something went wrong while fetching reservations.'
        });
      })
    ),
  { dispatch: false }
);




deleteReservation$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ReservationActions.deleteReservation),
    switchMap(({ reservationId }) =>
      this.reservationService.deleteReservation(reservationId).pipe(
        map(() => ReservationActions.deleteReservationSuccess()),
        tap(() => {
          this.dialogService.openSuccess({message:'Reservation deleted successfully.'});
        }),
        // Reload all reservations after successful delete
        switchMap(() =>
          of(ReservationActions.loadFilteredReservations({
            roomTypeName: undefined, // or keep filters
            dateFilter: 'month',     // replace with current filter
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
          }))
        ),
        catchError((error) =>
          of(ReservationActions.deleteReservationFailure({ error }))
        )
      )
    )
  )
);

}
