import { createFeatureSelector,createSelector } from "@ngrx/store";
import { ReservationState } from "./reservation.state";


export const selectReservationState =createFeatureSelector<ReservationState>('reservation')

export const selectCheckInDate=createSelector(
    selectReservationState,
    (state)=>state.checkIn
);

export const selectCheckOutDate=createSelector(
    selectReservationState,
    (state)=>state.checkOut
);

export const selectSelectedRoom =createSelector(
    selectReservationState,
    (state)=>state.selectedRoom
);