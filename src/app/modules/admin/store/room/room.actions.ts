import { createAction, props } from "@ngrx/store";
import { RoomRequestDTO, RoomResponseDTO } from "src/app/modules/admin/models/room.model";

export const loadRooms = createAction(
  '[Room] Load Rooms',
  props<{ roomType?: string }>()
);export const loadRoomsSuccess = createAction('[Room] Load Rooms Success', props<{ rooms: RoomResponseDTO[] }>());
export const createRoom = createAction('[Room] Create Room', props<{ room: RoomRequestDTO }>());
export const createRoomSuccess = createAction('[Room] Create Room Success', props<{ room: RoomResponseDTO }>());
export const deleteRoom = createAction('[Room] Delete Room', props<{ roomNo: number }>());
export const deleteRoomSuccess = createAction('[Room] Delete Room Success', props<{ roomNo: number }>());
export const loadRoomsFailure = createAction(
  '[Room] Load Rooms Failure',
  props<{ error: any }>()
);
