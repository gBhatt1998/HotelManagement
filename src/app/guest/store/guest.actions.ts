import { createAction, props } from '@ngrx/store';
import { GuestDetails, GuestReservationsResponse } from '../guest/guest.model';


export const loadGuestReservations = createAction('[Guest] Load Reservations');
export const loadGuestReservationsSuccess = createAction('[Guest] Load Reservations Success', props<{ data: GuestReservationsResponse }>());
export const loadGuestReservationsFailure = createAction('[Guest] Load Reservations Failure', props<{ error: string }>());

export const deleteGuestReservation = createAction('[Guest] Delete Reservation', props<{ id: number }>());
export const deleteGuestReservationSuccess = createAction('[Guest] Delete Reservation Success', props<{ id: number }>());
export const deleteGuestReservationFailure = createAction('[Guest] Delete Reservation Failure', props<{ error: string }>());

export const setGuestDetails = createAction(
  '[Guest] Set Guest Details from Local Storage',
  props<{ guest: GuestDetails }>()
);

export const clearGuestDetails = createAction('[Guest] Clear Guest Details');