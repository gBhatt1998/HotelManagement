import { createReducer,on, State } from "@ngrx/store";
import { ReservationState,initalState } from "./reservation.state";
import * as ReservationActions from "./reservation.action"

export const reservationReducer= createReducer(

    initalState,
    on(ReservationActions.setReservationDate,(state,{checkIn,checkOut})=> ({
        ...state,
        checkIn,
        checkOut
    })),
    on(ReservationActions.setReservationRoom,(state,{room})=> ({
        ...state,
       selectedRoom: room
    }))

)