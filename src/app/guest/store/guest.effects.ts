import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { GuestService } from 'src/app/shared/services/guest.service';
import * as GuestActions from './guest.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { DialogService } from 'src/app/shared/dialog.service';
import { GuestService } from '../guest.service';

@Injectable()
export class GuestEffects {
    constructor(private actions$: Actions, private guestService: GuestService, private dialog: DialogService) { }

    loadGuestReservations$ = createEffect(() =>
  this.actions$.pipe(
    ofType(GuestActions.loadGuestReservations),
    switchMap(() =>
      this.guestService.getReservations().pipe(
        map((data) => {
          // ✅ Save guest to localStorage here
          localStorage.setItem('guestDetails', JSON.stringify(data.guest));
          return GuestActions.loadGuestReservationsSuccess({ data });
        }),
        catchError((error) =>
          of(GuestActions.loadGuestReservationsFailure({ error: error.message }))
        )
      )
    )
  )
);


    deleteReservation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GuestActions.deleteGuestReservation),
            mergeMap(({ id }) =>
                this.guestService.deleteReservation(id).pipe(
                    map(() => {
                        this.dialog.openSuccess({ message: 'Reservation cancelled.' });
                        return GuestActions.deleteGuestReservationSuccess({ id });
                    }),
                    catchError(error => {
                        this.dialog.openError({ message: 'Failed to delete reservation', statusCode: error.status });
                        return of(GuestActions.deleteGuestReservationFailure({ error: error.message }));
                    })
                )
            )
        )
    );
  }