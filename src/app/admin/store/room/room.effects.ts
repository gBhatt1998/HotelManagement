import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RoomActions from './room.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { RoomService } from '../../room.service';

@Injectable()
export class RoomEffects {
  constructor(private actions$: Actions, private roomService: RoomService) {}

  loadRooms$ = createEffect(() => this.actions$.pipe(
    ofType(RoomActions.loadRooms),
    mergeMap(() => this.roomService.getAll().pipe(
      map(rooms => RoomActions.loadRoomsSuccess({ rooms })),
      catchError(() => of({ type: '[Room] Load Rooms Failure' }))
    ))
  ));

  createRoom$ = createEffect(() => this.actions$.pipe(
    ofType(RoomActions.createRoom),
    mergeMap(action => this.roomService.create(action.room).pipe(
      map(room => RoomActions.createRoomSuccess({ room })),
      catchError(() => of({ type: '[Room] Create Room Failure' }))
    ))
  ));

  deleteRoom$ = createEffect(() => this.actions$.pipe(
    ofType(RoomActions.deleteRoom),
    mergeMap(action => this.roomService.delete(action.roomNo).pipe(
      map(() => RoomActions.deleteRoomSuccess({ roomNo: action.roomNo })),
      catchError(() => of({ type: '[Room] Delete Room Failure' }))
    ))
  ));
}
