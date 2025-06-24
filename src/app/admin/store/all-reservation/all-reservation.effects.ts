
// store/all-reservation/all-reservation.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as ReservationActions from './all-reservation.actions';
import { DialogService } from 'src/app/shared/dialog.service';
import { AllReservationService } from '../../all-reservation.service';

@Injectable()
export class ReservationEffects {
  constructor(
    private actions$: Actions,
    private reservationService: AllReservationService,
    private dialogService: DialogService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.loadAllReservations),
      mergeMap(({ roomType }) =>
       this.reservationService.getAllReservations(roomType).pipe(
            // tap(res => console.log('[Effect] Fetched Reservations:', res)), // 
          map((reservations) => ReservationActions.loadAllReservationsSuccess({ reservations })),
          
          catchError((error) => 
                    //   console.error('[Effect] Load Reservations Error:', error); //

             of(ReservationActions.loadAllReservationsFailure({ error })))
        )
      )
    )
  );


delete$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ReservationActions.deleteReservation),
    mergeMap(({ id }) =>
      this.reservationService.deleteReservation(id).pipe(
        mergeMap((response) => [
          ReservationActions.deleteReservationSuccess({ id })
       ]),
        tap((response) => {
          this.dialogService.openSuccess({
            title: 'Deleted',
            message: response.type || 'Reservation deleted successfully',
          });
        }),
        catchError((error) => {
          this.dialogService.openError({
            title: 'Deletion Failed',
            message: error?.error?.message || 'Failed to delete reservation',
          });
          return of(ReservationActions.deleteReservationFailure({ error }));
        })
      )
    )
  )
);

}