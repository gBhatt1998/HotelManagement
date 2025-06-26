import { createReducer, on } from '@ngrx/store';
import * as GuestActions from './guest.actions';
import { GuestReservationsResponse } from '../components/guest/guest.model';


export interface GuestState {
    data: GuestReservationsResponse | null;
    error: string | null;
    loading: boolean;
}

const initialState: GuestState = {
    data: null,
    error: null,
    loading: false
};

export const guestReducer = createReducer(
    initialState,
    on(GuestActions.loadGuestReservations, state => ({ ...state, loading: true })),
    on(GuestActions.loadGuestReservationsSuccess, (state, { data }) => ({ ...state, loading: false, data })),
    on(GuestActions.loadGuestReservationsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(GuestActions.deleteGuestReservation, state => ({ ...state, loading: true })),
    on(GuestActions.deleteGuestReservationSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        data: {
            ...state.data!,
            reservations: state.data!.reservations.filter(r => r.reservationId !== id)
        }
    })),
    on(GuestActions.deleteGuestReservationFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Set GuestDetails from localStorage
  on(GuestActions.setGuestDetails, (state, { guest }) => ({
    ...state,
    data: state.data
      ? { ...state.data, guest }
      : { guest, reservations: [], serviceNames: [] }
  })),

  // Clear GuestDetails on logout
  on(GuestActions.clearGuestDetails, state => ({
    ...state,
    data: null
  }))
);