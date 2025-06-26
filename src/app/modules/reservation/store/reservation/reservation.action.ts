import { createAction,props } from "@ngrx/store";
import { Room } from "../../models/room.model";

export const setReservationDate=createAction(
    '[Reservation] Set Dates',
    props<{checkIn:Date; checkOut:Date}>()
);

export const setReservationRoom=createAction(
    '[Reservation] Select Room',
    props<{room:Room}>()
);

export const resetReservationDates = createAction('[Reservation] Reset Dates');
