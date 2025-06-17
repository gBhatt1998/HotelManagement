import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GuestState } from './guest.reducer';

export const selectGuestState = createFeatureSelector<GuestState>('guest');

export const selectGuestReservations = createSelector(selectGuestState, state => state.data?.reservations || []);
export const selectGuestLoading = createSelector(selectGuestState, state => state.loading);
export const selectGuestError = createSelector(selectGuestState, state => state.error);
export const selectGuestDetails = createSelector(
    selectGuestState,
    state => state.data?.guest || null
  );