import { createReducer, on } from '@ngrx/store';
import * as RoomActions from './room.actions';
import { RoomResponseDTO } from 'src/app/shared/models/room.model';

export interface RoomState {
  rooms: RoomResponseDTO[];
  loading: boolean;
  error: any;
  roomFilter: string; // default to empty string
}

export const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null,
  roomFilter: ''
};

export const roomReducer = createReducer(
  initialState,

  // Start loading and set roomFilter from payload
  on(RoomActions.loadRooms, (state, { roomType }) => ({
    ...state,
    loading: true,
    error: null,
    roomFilter: roomType ?? ''  // update the filter
  })),

  // Save rooms on success
  on(RoomActions.loadRoomsSuccess, (state, { rooms }) => ({
    ...state,
    rooms,
    loading: false
  })),

  // On failure
  on(RoomActions.loadRoomsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create success — handled by reloading in effects; optional append here
  on(RoomActions.createRoomSuccess, (state, { room }) => ({
    ...state,
    rooms: [...state.rooms, room]
  })),

  // Delete success — handled by reloading in effects; optional filter here
  on(RoomActions.deleteRoomSuccess, (state, { roomNo }) => ({
    ...state,
    rooms: state.rooms.filter(r => r.roomNo !== roomNo)
  }))
);
