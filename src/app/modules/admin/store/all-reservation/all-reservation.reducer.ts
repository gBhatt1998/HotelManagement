
// store/all-reservation/all-reservation.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ReservationActions from './all-reservation.actions';
import { reservationdetailsresponse } from'src/app/shared/models/reservationdetailsresponse.model';

export interface ReservationState {
  reservations: reservationdetailsresponse[];
  loading: boolean;
  error: any;
}

export const initialState: ReservationState = {
  reservations: [],
  loading: false,
  error: null,
};

export const reservationReducer = createReducer(
  initialState,
  on(ReservationActions.loadAllReservations, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReservationActions.loadAllReservationsSuccess, (state, { reservations }) => ({
    ...state,
    reservations,
    loading: false,
  })),
  on(ReservationActions.loadAllReservationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ReservationActions.deleteReservationSuccess, (state, { id }) => ({
    ...state,
    reservations: state.reservations.filter(r => r.reservationId !== id),
  })),
  on(ReservationActions.deleteReservationFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);