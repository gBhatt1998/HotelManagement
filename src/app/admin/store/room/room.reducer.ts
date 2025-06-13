
import { createReducer, on } from '@ngrx/store';
import * as RoomActions from './room.actions';
import { RoomResponseDTO } from 'src/app/shared/models/room.model';

export interface RoomState {
  rooms: RoomResponseDTO[];
  loading: boolean;
}

export const initialState: RoomState = {
  rooms: [],
  loading: false
};

export const roomReducer = createReducer(
  initialState,
  on(RoomActions.loadRooms, state => ({ ...state, loading: true })),
  on(RoomActions.loadRoomsSuccess, (state, { rooms }) => ({ ...state, rooms, loading: false })),
  on(RoomActions.createRoomSuccess, (state, { room }) => ({
    ...state,
    rooms: [...state.rooms, room]
  })),
  on(RoomActions.deleteRoomSuccess, (state, { roomNo }) => ({
    ...state,
    rooms: state.rooms.filter(r => r.roomNo !== roomNo)
  }))
);
