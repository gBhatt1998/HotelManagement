import { createAction,props } from "@ngrx/store";

export const setReservationDate=createAction(
    '[Reservation] Set Dates',
    props<{checkIn:Date; checkOut:Date}>()
);

export const setReservationRoom=createAction(
    '[Reservation] Select Room',
    props<{room:any}>()
);