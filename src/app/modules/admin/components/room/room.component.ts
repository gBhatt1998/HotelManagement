import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RoomResponseDTO, RoomRequestDTO } from 'src/app/modules/admin/models/room.model';
import { RoomType } from 'src/app/modules/admin/models/room-type.model';
import * as RoomActions from '../../store/room/room.actions';
import * as RoomTypeActions from '../../store/room-type/room-type.actions';
import { selectRoomTypes } from '../../store/room-type/room-type.selectors';
import { selectAllRooms } from '../../store/room/room.selectors';
import { DynamicFormDialogComponent } from 'src/app/shared/components/dynamic-form-dialog/dynamic-form-dialog.component';
import { RoomService } from '../../services/room.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
  rooms$: Observable<RoomResponseDTO[]>;
  roomTypes$: Observable<RoomType[]>;
  roomTypeOptions: { label: string; value: number }[] = [];
  filterRoomTypes: string[] = [];
//  suggestedRoomNos: number[] = [];

  displayedColumns = [
    { key: 'roomNo', label: 'Room No.' },
    { key: 'roomTypeName', label: 'Room Type' },
  ];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private roomService: RoomService,
    private dialogService:DialogService
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
    width: '600px',
    data: {
      formTitle: 'Create Room(s)',
      moduleName: 'Room',
    layout: 'two-column', 

      isEdit: false,
      suggestedRoomNos: [], 
      formFields: [
        {
          key: 'roomTypeId',
          label: 'Room Type',
          type: 'select',
          required: true,
          options: this.roomTypeOptions
        },
        {
          key: 'baseRoomNo',
          label: 'Starting Room No.',
          type: 'number',
          required: true
        },
        {
          key: 'count',
          label: 'Number of Rooms',
          type: 'number',
          required: true
        },
        {
          key: 'checkAvailability',
          label: 'Check Room Numbers',
          type: 'button'
        },
        
      ],
      onFieldChange: (
        fieldKey: string,
        value: any,
        patchForm: (key: string, value: any) => void,
        formValue: any
      ) => {
        if (fieldKey === 'checkAvailability') {
          const { roomTypeId, baseRoomNo, count } = formValue;

          if (roomTypeId && baseRoomNo > 0 && count > 0 && count <= 8) {
            this.roomService.suggestRoomNumbers(roomTypeId, baseRoomNo, count).subscribe({
              next: (suggested) => {

                dialogRef.componentInstance.data.suggestedRoomNos = suggested;
              },
              error: (error) => {
                this.dialogService.openError({
                  title: 'Room Suggestion Error',
                  message: error?.error?.message || 'An unexpected error occurred.'
                });
              }
            });
            
          } else {
            dialogRef.componentInstance.data.suggestedRoomNos = [];
          }
        }
      }
    }
  });

    dialogRef.afterClosed().subscribe((result: any) => {
      const suggestedRoomNos = dialogRef.componentInstance.data.suggestedRoomNos ?? [];

      if (result?.roomTypeId && suggestedRoomNos.length > 0) {
        const roomsToCreate: RoomRequestDTO[] = suggestedRoomNos.map(roomNo => ({
          roomTypeId: result.roomTypeId,
          roomNo,
          availability: true
        }));

        this.roomService.createMultipleRooms(roomsToCreate).subscribe({
          next: (createdRooms) => {
            this.store.dispatch(RoomActions.loadRooms({ roomType: '' }));
            this.dialogService.openSuccess({
              title: 'Rooms Created',
              message: `${createdRooms.length} rooms successfully created.`
            });
          },
          error: (error) => {
            this.dialogService.openError({
              title: 'Creation Error',
              message: error?.error?.message || 'Failed to create rooms.'
            });
          }
        });
      }
    });
}}