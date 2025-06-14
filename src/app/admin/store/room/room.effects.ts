import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RoomActions from './room.actions';
import { RoomService } from '../../room.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { DialogService } from 'src/app/shared/dialog.service';

@Injectable()
export class RoomEffects {
  constructor(
    private actions$: Actions,
    private roomService: RoomService,
    private dialogService: DialogService
  ) { }

  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.loadRooms),
      mergeMap(() =>
        this.roomService.getAll().pipe(
          map(rooms => RoomActions.loadRoomsSuccess({ rooms })),
          catchError(() => of({ type: '[Room] Load Rooms Failure' }))
        )
      )
    )
  );

  createRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.createRoom),
      mergeMap(action => {
        const dialogRef = this.dialogService.openLoading('Creating Room...');
        return this.roomService.create(action.room).pipe(
          map(room => {
            dialogRef.close();
            this.dialogService.openSuccess({ message: 'Room created successfully!' });
            return RoomActions.createRoomSuccess({ room });
          }),
          catchError(err => {
            dialogRef.close();
            this.dialogService.openError({
              message: 'Failed to create room.',
              statusCode: err?.status || 500
            });
            return of({ type: '[Room] Create Room Failure' });
          })
        );
      })
    )
  );

  createRoomSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.createRoomSuccess),
      map(() => RoomActions.loadRooms())
    )
  );

  deleteRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.deleteRoom),
      switchMap(action => {
        const dialogRef = this.dialogService.openLoading(`Deleting Room #${action.roomNo}...`);
        return this.roomService.delete(action.roomNo).pipe(
          map(() => {
            dialogRef.close();
            this.dialogService.openSuccess({ message: 'Room deleted successfully.' });
            return RoomActions.deleteRoomSuccess({ roomNo: action.roomNo });
          }),
          catchError(err => {
            dialogRef.close();
            this.dialogService.openError({
              message: 'Failed to delete room.',
              statusCode: err?.status || 500
            });
            return of({ type: '[Room] Delete Room Failure' });
          })
        );
      })
    )
  );

  deleteRoomSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.deleteRoomSuccess),
      map(() => RoomActions.loadRooms())
    )
  );
}
