import { createReducer, on } from '@ngrx/store';
import * as RoomTypeActions from './room-type.actions';
import { RoomType } from 'src/app/shared/models/room-type.model';

export interface RoomTypeState {
    roomTypes: RoomType[];
    loading: boolean;
    error: any;
}

const initialState: RoomTypeState = {
    roomTypes: [],
    loading: false,
    error: null
};

export const roomTypeReducer = createReducer(
    initialState,
    on(RoomTypeActions.loadRoomTypes, state => ({ ...state, loading: true })),
    on(RoomTypeActions.loadRoomTypesSuccess, (state, { roomTypes }) => ({ ...state, roomTypes, loading: false })),
    on(RoomTypeActions.loadRoomTypesFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(RoomTypeActions.addRoomTypeSuccess, (state, { roomType }) => ({ ...state, roomTypes: [...state.roomTypes, roomType] })),
    on(RoomTypeActions.updateRoomTypeSuccess, (state, { roomType }) => ({
        ...state,
        roomTypes: state.roomTypes.map(r => r.id === roomType.id ? roomType : r)
    })),
    on(RoomTypeActions.deleteRoomTypeSuccess, (state, { id }) => ({
        ...state,
        roomTypes: state.roomTypes.filter(r => r.id !== id)
    }))
);