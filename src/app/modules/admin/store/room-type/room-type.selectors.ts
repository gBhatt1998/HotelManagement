// src/app/admin/store/room-type/room-type.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomTypeState } from './room-type.reducer';

// 1. Select the whole room type feature state
export const selectRoomTypeState = createFeatureSelector<RoomTypeState>('roomTypes');

// 2. Select the list of room types
export const selectRoomTypes = createSelector(
  selectRoomTypeState,
  (state) => state.roomTypes
);

// 3. Select loading state
export const selectRoomTypeLoading = createSelector(
  selectRoomTypeState,
  (state) => state.loading
);

// 4. Select error state
export const selectRoomTypeError = createSelector(
  selectRoomTypeState,
  (state) => state.error
);
export const selectAllRoomTypes = selectRoomTypes;
