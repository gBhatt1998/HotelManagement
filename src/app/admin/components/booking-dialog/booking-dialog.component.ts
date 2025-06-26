import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Booking } from '../../models/booking.model';
import { RoomType } from 'src/app/admin/models/room-type.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadRoomTypes } from 'src/app/admin/store/room-type/room-type.actions';
import { selectAllRoomTypes } from 'src/app/admin/store/room-type/room-type.selectors';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css']
})
export class BookingDialogComponent {
  roomTypes$: Observable<RoomType[]>;
  selectedRoomType: RoomType | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Booking,
    private dialogRef: MatDialogRef<BookingDialogComponent>,
    private store: Store
  ) {
    this.roomTypes$ = this.store.select(selectAllRoomTypes);
  }
  ngOnInit(): void {
    this.store.dispatch(loadRoomTypes());

    this.roomTypes$.subscribe(roomTypes => {
      this.selectedRoomType = roomTypes.find(rt => rt.name === this.data.roomTypeName) ?? null;
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close({ delete: true });
  }

  // Guest + Booking info for dynamic card
  getCardData() {
    return [{
      guestName: this.data.guestName,
      phoneNumber: this.data.phoneNumber,
      roomId: this.data.roomId,
      roomTypeName: this.data.roomTypeName,
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      totalPrice: '$' + this.data.totalPrice
    }];
  }
}
