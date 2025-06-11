// store/all-reservation/all-reservation.actions.ts
import { createAction, props } from '@ngrx/store';
import { reservationdetailsresponse } from'src/app/shared/models/reservationdetailsresponse.model';

export const loadAllReservations = createAction('[Reservation] Load All');

export const loadAllReservationsSuccess = createAction(
  '[Reservation] Load All Success',
  props<{ reservations: reservationdetailsresponse[] }>()
);

export const loadAllReservationsFailure = createAction(
  '[Reservation] Load All Failure',
  props<{ error: any }>()
);

export const deleteReservation = createAction(
  '[Reservation] Delete',
  props<{ id: number }>()
);

export const deleteReservationSuccess = createAction(
  '[Reservation] Delete Success',
  props<{ id: number }>()
);

export const deleteReservationFailure = createAction(
  '[Reservation] Delete Failure',
  props<{ error: any }>()
);
