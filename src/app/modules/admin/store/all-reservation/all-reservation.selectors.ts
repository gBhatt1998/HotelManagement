// store/all-reservation/all-reservation.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReservationState } from './all-reservation.reducer';

export const selectReservationState = createFeatureSelector<ReservationState>('allReservations');

export const selectAllReservations = createSelector(
  selectReservationState,
  (state) => state.reservations
);

export const selectReservationLoading = createSelector(
  selectReservationState,
  (state) => state.loading
);

export const selectReservationError = createSelector(
  selectReservationState,
  (state) => state.error
);