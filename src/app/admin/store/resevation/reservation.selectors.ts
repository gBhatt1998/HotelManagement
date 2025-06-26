import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReservationState } from 'src/app/admin/store/resevation/reservation.reducer';

export const selectReservationState = createFeatureSelector<ReservationState>('calendarReservations');

export const selectAllReservations = createSelector(
  selectReservationState,
  (state) => state.allReservations
);

export const selectReservationsLoading = createSelector(
  selectReservationState,
  (state) => state.loading
);
