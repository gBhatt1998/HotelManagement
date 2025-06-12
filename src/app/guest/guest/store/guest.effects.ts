import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { GuestService } from 'src/app/shared/services/guest.service';
import * as GuestActions from './guest.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { DialogService } from 'src/app/shared/dialog.service';
import { GuestService } from '../../guest.service';

@Injectable()
export class GuestEffects {
    constructor(private actions$: Actions, private guestService: GuestService, private dialog: DialogService) { }

    loadReservations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GuestActions.loadGuestReservations),
            mergeMap(() =>
                this.guestService.getReservations().pipe(
                    tap(data => console.log('GUEST RES DATA:', data)), // <- 👈 ADD THIS

                    map(data => GuestActions.loadGuestReservationsSuccess({ data })),
                    catchError(error => {
                        this.dialog.openError({ message: 'Failed to load reservations', statusCode: error.status });
                        return of(GuestActions.loadGuestReservationsFailure({ error: error.message }));
                    })
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