import { createReducer, on } from '@ngrx/store';
import * as RoomTypeActions from './room-type.actions';
import { RoomType } from 'src/app/admin/models/room-type.model';

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

    // Trigger loading spinner
    on(RoomTypeActions.loadRoomTypes, state => ({ ...state, loading: true })),

    // On success, update full list and stop spinner
    on(RoomTypeActions.loadRoomTypesSuccess, (state, { roomTypes }) => ({
        ...state,
        roomTypes,
        loading: false,
        error: null
    })),

    // On any failure
    on(
        RoomTypeActions.loadRoomTypesFailure,
        RoomTypeActions.addRoomTypeFailure,
        RoomTypeActions.updateRoomTypeFailure,
        RoomTypeActions.deleteRoomTypeFailure,
        (state, { error }) => ({
            ...state,
            loading: false,
            error
        })
    )
);
