import { createAction, props } from '@ngrx/store';
import { RoomType } from 'src/app/modules/admin/models/room-type.model';

export const loadRoomTypes = createAction('[RoomType] Load RoomTypes');
export const loadRoomTypesSuccess = createAction('[RoomType] Load RoomTypes Success', props<{ roomTypes: RoomType[] }>());
export const loadRoomTypesFailure = createAction('[RoomType] Load RoomTypes Failure', props<{ error: any }>());

export const addRoomType = createAction('[RoomType] Add RoomType', props<{ roomType: Partial<RoomType> }>());
export const addRoomTypeSuccess = createAction('[RoomType] Add RoomType Success', props<{ roomType: RoomType }>());
export const addRoomTypeFailure = createAction('[RoomType] Add RoomType Failure', props<{ error: any }>());

export const updateRoomType = createAction('[RoomType] Update RoomType', props<{ id: number, roomType: Partial<RoomType> }>());
export const updateRoomTypeSuccess = createAction('[RoomType] Update RoomType Success', props<{ roomType: RoomType }>());
export const updateRoomTypeFailure = createAction('[RoomType] Update RoomType Failure', props<{ error: any }>());

export const deleteRoomType = createAction('[RoomType] Delete RoomType', props<{ id: number }>());
export const deleteRoomTypeSuccess = createAction('[RoomType] Delete RoomType Success', props<{ id: number }>());
export const deleteRoomTypeFailure = createAction('[RoomType] Delete RoomType Failure', props<{ error: any }>());
