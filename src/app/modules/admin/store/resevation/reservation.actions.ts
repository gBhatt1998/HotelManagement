import { createAction, props } from '@ngrx/store';
import { ReservationDetailsResponse } from '../../models/reservation-details-response.model';
export const loadFilteredReservations = createAction(
  '[Reservation] Load Filtered Reservations',
  props<{
    roomTypeName?: string;
    dateFilter: 'today' | 'week' | 'month' ;
    month: number;
    year: number;
  }>()
);

export const loadFilteredReservationsSuccess = createAction(
  '[Reservation] Load Filtered Reservations Success',
  props<{ reservations: ReservationDetailsResponse[] }>()
);

export const loadFilteredReservationsFailure = createAction(
  '[Reservation] Load Filtered Reservations Failure',
  props<{ error: any }>()
);


export const deleteReservation = createAction(
  '[Reservation] Delete Reservation',
  props<{ reservationId: number }>()
);

export const deleteReservationSuccess = createAction(
  '[Reservation] Delete Reservation Success'
);

export const deleteReservationFailure = createAction(
  '[Reservation] Delete Reservation Failure',
  props<{ error: any }>()
);
