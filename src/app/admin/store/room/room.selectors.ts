import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomState } from './room.reducer';

export const selectRoomState = createFeatureSelector<RoomState>('rooms');

export const selectAllRooms = createSelector(selectRoomState, state => state.rooms);
export const selectRoomLoading = createSelector(selectRoomState, state => state.loading);
    export const selectRoomFilter = createSelector(
  selectRoomState,
  (state) => state.roomFilter || ''
);
