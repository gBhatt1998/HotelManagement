import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RoomType } from 'src/app/modules/admin/models/room-type.model';
import * as RoomTypeActions from '../../store/room-type/room-type.actions';
import { DynamicFormDialogComponent } from 'src/app/shared/components/dynamic-form-dialog/dynamic-form-dialog.component';
import { selectRoomTypes } from '../../store/room-type/room-type.selectors';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
})
export class RoomTypeComponent implements OnInit {
  roomTypes$: Observable<RoomType[]>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.roomTypes$ = this.store.select(selectRoomTypes);
  }

  ngOnInit(): void {
    this.store.dispatch(RoomTypeActions.loadRoomTypes());
  }

  onDelete(roomType: RoomType): void {
    this.store.dispatch(RoomTypeActions.deleteRoomType({ id: roomType.id }));
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormDialogComponent, {
      data: {
        formTitle: 'Create Room Type',
        formFields: [
          {
            key: 'type',
            label: 'Type',
            type: 'text',
            required: true,
            validators: [
              { name: 'minlength', value: 3, message: 'Type must be at least 3 characters' },
              { name: 'maxlength', value: 30, message: 'Type cannot exceed 30 characters' }
            ]
          },
          {
            key: 'description',
            label: 'Description',
            type: 'textarea',
            required: true,
            validators: [
              { name: 'minlength', value: 10, message: 'Description must be at least 10 characters' },
              { name: 'maxlength', value: 500, message: 'Description is too long' }
            ]
          },
          {
            key: 'pricePerNight',
            label: 'Price Per Night',
            type: 'number',
            required: true,
            validators: [
              { name: 'min', value: 1, message: 'Price must be at least ₹1' }
            ]
          },
          {
            key: 'imageUrl',
            label: 'Image URL',
            type: 'text',
            required: true,
            validators: [
              {
                name: 'pattern',
                value: '^(https?:\\/\\/.*\\.(?:png|jpg|jpeg|gif|webp))$',
                message: 'Must be a valid image URL (jpg, png, etc.)'
              }
            ]
          }
        ],
        isEdit: false,
        moduleName: 'RoomType'
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: Partial<RoomType> | null) => {
      if (result) {
        this.store.dispatch(RoomTypeActions.addRoomType({ roomType: result }));
      }
    });
  }

  onEdit(roomType: RoomType): void {
    const dialogRef = this.dialog.open(DynamicFormDialogComponent, {
      data: {
        formTitle: 'Edit Room Type',
        formFields: [
          {
            key: 'type',
            label: 'Type',
            type: 'text',
            required: true,
            value: roomType.type,
            validators: [
              { name: 'minlength', value: 3, message: 'Type must be at least 3 characters' },
              { name: 'maxlength', value: 30, message: 'Type cannot exceed 30 characters' }
            ]
          },
          {
            key: 'description',
            label: 'Description',
            type: 'textarea',
            required: true,
            value: roomType.description,
            validators: [
              { name: 'minlength', value: 10, message: 'Description must be at least 10 characters' },
              { name: 'maxlength', value: 500, message: 'Description is too long' }
            ]
          },
          {
            key: 'pricePerNight',
            label: 'Price Per Night',
            type: 'number',
            required: true,
            value: roomType.pricePerNight,
            validators: [
              { name: 'min', value: 1, message: 'Price must be at least ₹1' }
            ]
          },
          {
            key: 'imageUrl',
            label: 'Image URL',
            type: 'text',
            required: true,
            value: roomType.imageUrl,
            validators: [
              {
                name: 'pattern',
                value: '^(https?:\\/\\/.*\\.(?:png|jpg|jpeg|gif|webp))$',
                message: 'Must be a valid image URL (jpg, png, etc.)'
              }
            ]
          }
        ],
        isEdit: true,
        moduleName: 'RoomType'
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: Partial<RoomType> | null) => {
      if (result) {
        this.store.dispatch(
          RoomTypeActions.updateRoomType({
            id: roomType.id,
            roomType: { ...roomType, ...result }
          })
        );
      }
    });
  }
}
