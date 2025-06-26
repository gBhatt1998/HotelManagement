import { createReducer,on } from "@ngrx/store";
import { ReservationState,initialState } from "./reservation.state";
import * as ReservationActions from "./reservation.action"

export const reservationReducer= createReducer(

    initialState,
    on(ReservationActions.setReservationDate,(state,{checkIn,checkOut})=> ({
        ...state,
        checkIn,
        checkOut
    })),
    on(ReservationActions.setReservationRoom,(state,{room})=> ({
        ...state,
       selectedRoom: room
    })),
   on(ReservationActions.resetReservationDates, (state) => ({
    ...state,
    checkIn: null,
    checkOut: null,
    selectedRoom: null
  }))
);