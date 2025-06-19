import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RoomResponseDTO, RoomRequestDTO } from 'src/app/shared/models/room.model';
import { RoomType } from 'src/app/shared/models/room-type.model';
import * as RoomActions from '../store/room/room.actions';
import * as RoomTypeActions from '../store/room-type/room-type.actions';
import { selectRoomTypes } from '../store/room-type/room-type.selectors';
import { selectAllRooms } from '../store/room/room.selectors';
import { DynamicFormDialogComponent } from 'src/app/shared/dynamic-form-dialog/dynamic-form-dialog.component';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
  rooms$: Observable<RoomResponseDTO[]>;
  roomTypes$: Observable<RoomType[]>;
  roomTypeOptions: { label: string; value: number }[] = [];
  filterRoomTypes:string[]=[];

  displayedColumns = [
    { key: 'roomNo', label: 'Room No.' },
    // { key: 'availability', label: 'Available' },
    { key: 'roomTypeName', label: 'Room Type' },
    // { key: 'canDelete', label: 'Can Delete' }
  ];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private roomService: RoomService
  ) {
    this.rooms$ = this.store.select(selectAllRooms);
    this.roomTypes$ = this.store.select(selectRoomTypes);
  }

  ngOnInit(): void {
    this.store.dispatch(RoomActions.loadRooms({ roomType: '' }));
    this.store.dispatch(RoomTypeActions.loadRoomTypes());

    this.roomTypes$.subscribe((roomTypes) => {
      this.roomTypeOptions = roomTypes.map(rt => ({
        label: rt.type,
        value: rt.id
      }));
        this.filterRoomTypes = roomTypes.map(rt => rt.type);

    });
  }

  onRoomTypeChange(roomType: string): void {

    this.store.dispatch(RoomActions.loadRooms({ roomType }));
  }

  onDelete(room: RoomResponseDTO): void {
    this.store.dispatch(RoomActions.deleteRoom({ roomNo: room.roomNo }));
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormDialogComponent, {
      width: '500px',
      data: {
        formTitle: 'Create Room',
        moduleName: 'Room',
        isEdit: false,
        formFields: [
          {
            key: 'roomTypeId',
            label: 'Room Type',
            type: 'select',
            required: true,
            options: this.roomTypeOptions,
          },
          {
            key: 'roomNo',
            label: 'Room Number (auto-generated)',
            type: 'text',
            disabled: true
          }
        ],
        onFieldChange: (
          fieldKey: string,
          value: any,
          patchForm: (key: string, value: any) => void
        ) => {
          if (fieldKey === 'roomTypeId' && value) {
            this.roomService.suggestNextRoomNumber(value).subscribe({
              next: (suggestedRoomNo: number) => patchForm('roomNo', suggestedRoomNo),
              error: () => patchForm('roomNo', 'Error')
            });
          }
        }
      }
    });

    dialogRef.afterClosed().subscribe((result: Partial<RoomRequestDTO> | null) => {
      if (result) {
        const roomRequest: RoomRequestDTO = {
          roomTypeId: result.roomTypeId!,
          availability: true
        };
        this.store.dispatch(RoomActions.createRoom({ room: roomRequest }));
      }
    });
  }
}
