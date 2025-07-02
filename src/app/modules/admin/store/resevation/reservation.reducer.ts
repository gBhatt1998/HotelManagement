import { createReducer, on } from '@ngrx/store';
import * as ReservationActions from './reservation.actions';
import { ReservationDetailsResponse } from '../../models/reservation-details-response.model';

export interface ReservationState {
  allReservations: ReservationDetailsResponse[];
  loading: boolean;
  error: any;
}

export const initialState: ReservationState = {
  allReservations: [],
  loading: false,
  error: null,
};

export const reservationReducer = createReducer(
  initialState,

  on(ReservationActions.loadFilteredReservations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReservationActions.loadFilteredReservationsSuccess, (state, { reservations }) => ({
    ...state,
    loading: false,
    allReservations: reservations,
  })),
  on(ReservationActions.loadFilteredReservationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ReservationActions.deleteReservation, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReservationActions.deleteReservationSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(ReservationActions.deleteReservationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
