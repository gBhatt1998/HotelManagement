import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RoomResponseDTO, RoomRequestDTO } from 'src/app/shared/models/room.model';
import { RoomType } from 'src/app/shared/models/room-type.model';
import * as RoomActions from '../store/room/room.actions';
import * as RoomTypeActions from '../store/room-type/room-type.actions';
import { selectRoomTypes } from '../store/room-type/room-type.selectors';
import { DynamicFormDialogComponent } from 'src/app/shared/dynamic-form-dialog/dynamic-form-dialog.component';
import { RoomService } from '../room.service';
import { selectAllRooms } from '../store/room/room.selectors';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
  rooms$: Observable<RoomResponseDTO[]>;
  roomTypes$: Observable<RoomType[]>;
  selectedRoomType: RoomType | null = null;

  displayedColumns = ['roomNo', 'availability', 'roomTypeName', 'canDelete'];

  constructor(private store: Store, private dialog: MatDialog, private roomService: RoomService) {
this.rooms$ = this.store.select(selectAllRooms);
    this.roomTypes$ = this.store.select(selectRoomTypes);
  }

  ngOnInit(): void {
    this.store.dispatch(RoomActions.loadRooms());
    this.store.dispatch(RoomTypeActions.loadRoomTypes());
  }

  onDelete(room: RoomResponseDTO): void {
    this.store.dispatch(RoomActions.deleteRoom({ roomNo: room.roomNo }));
  }

  openCreateDialog(): void {
    let selectedRoomTypeId: number;

    const dialogRef = this.dialog.open(DynamicFormDialogComponent, {
      data: {
        formTitle: 'Create Room',
        formFields: [
          {
            key: 'roomTypeId',
            label: 'Room Type',
            type: 'select',
            required: true,
            options$: this.roomTypes$,
            optionLabel: 'type',
            optionValue: 'id'
          },
          {
            key: 'roomNo',
            label: 'Room Number (auto-generated)',
            type: 'number',
            disabled: true
          },
          {
            key: 'availability',
            label: 'Availability',
            type: 'boolean',
            required: true
          }
        ],
        onFieldChange: (fieldKey: string, value: any, patchForm: (key: string, value: any) => void) => {
          if (fieldKey === 'roomTypeId') {
            selectedRoomTypeId = value;
            this.roomService.suggestNextRoomNumber(selectedRoomTypeId).subscribe((suggestedNo) => {
              patchForm('roomNo', suggestedNo);
            });
          }
        },
        isEdit: false,
        moduleName: 'Room'
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: Partial<RoomRequestDTO> | null) => {
      if (result) {
        const request: RoomRequestDTO = {
          roomTypeId: result.roomTypeId!,
          availability: result.availability!
        };
        this.store.dispatch(RoomActions.createRoom({ room: request }));
      }
    });
  }
}
