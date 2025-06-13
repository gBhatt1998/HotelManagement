import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import * as RoomTypeActions from './room-type.actions';
import { RoomTypeService } from '../../room-type.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Injectable()
export class RoomTypeEffects {
    constructor(
        private actions$: Actions,
        private roomTypeService: RoomTypeService,
        private dialogService: DialogService
    ) { }

    loadRoomTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RoomTypeActions.loadRoomTypes),
            mergeMap(() => {
                const dialogRef = this.dialogService.openLoading('Loading room types...');
                return this.roomTypeService.getRoomTypes().pipe(
                    tap(() => dialogRef.close()),
                    map(roomTypes => RoomTypeActions.loadRoomTypesSuccess({ roomTypes })),
                    catchError(error => {
                        dialogRef.close();
                        this.dialogService.openError({
                            title: 'Load Failed',
                            message: error?.error?.message || 'Failed to load room types.'
                        });
                        return of(RoomTypeActions.loadRoomTypesFailure({ error }));
                    })
                );
            })
        )
    );

    addRoomType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RoomTypeActions.addRoomType),
            mergeMap(({ roomType }) => {
                const dialogRef = this.dialogService.openLoading('Adding room type...');
                return this.roomTypeService.addRoomType(roomType).pipe(
                    switchMap(() => this.roomTypeService.getRoomTypes()),
                    map(roomTypes => {
                        dialogRef.close();
                        this.dialogService.openSuccess({
                            title: 'Added',
                            message: 'Room type added successfully'
                        });
                        return RoomTypeActions.loadRoomTypesSuccess({ roomTypes });
                    }),
                    catchError(error => {
                        dialogRef.close();
                        this.dialogService.openError({
                            title: 'Add Failed',
                            message: error?.error?.message || 'Failed to add room type'
                        });
                        return of(RoomTypeActions.addRoomTypeFailure({ error }));
                    })
                );
            })
        )
    );

    updateRoomType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RoomTypeActions.updateRoomType),
            mergeMap(({ id, roomType }) => {
                const dialogRef = this.dialogService.openLoading('Updating room type...');
                return this.roomTypeService.updateRoomType(id, roomType).pipe(
                    switchMap(() => this.roomTypeService.getRoomTypes()),
                    map(roomTypes => {
                        dialogRef.close();
                        this.dialogService.openSuccess({
                            title: 'Updated',
                            message: 'Room type updated successfully'
                        });
                        return RoomTypeActions.loadRoomTypesSuccess({ roomTypes });
                    }),
                    catchError(error => {
                        dialogRef.close();
                        this.dialogService.openError({
                            title: 'Update Failed',
                            message: error?.error?.message || 'Failed to update room type'
                        });
                        return of(RoomTypeActions.updateRoomTypeFailure({ error }));
                    })
                );
            })
        )
    );

    deleteRoomType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RoomTypeActions.deleteRoomType),
            mergeMap(({ id }) => {
                const dialogRef = this.dialogService.openLoading('Deleting room type...');
                return this.roomTypeService.deleteRoomType(id).pipe(
                    switchMap(() => this.roomTypeService.getRoomTypes()),
                    map(roomTypes => {
                        dialogRef.close();
                        this.dialogService.openSuccess({
                            title: 'Deleted',
                            message: 'Room type deleted successfully'
                        });
                        return RoomTypeActions.loadRoomTypesSuccess({ roomTypes });
                    }),
                    catchError(error => {
                        dialogRef.close();
                        this.dialogService.openError({
                            title: 'Delete Failed',
                            message: error?.error?.message || 'Failed to delete room type'
                        });
                        return of(RoomTypeActions.deleteRoomTypeFailure({ error }));
                    })
                );
            })
        )
    );
}
