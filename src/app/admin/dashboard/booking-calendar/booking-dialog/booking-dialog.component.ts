// booking-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Booking } from '../models/booking.model';

@Component({
  selector: 'app-booking-dialog',
  template: `
    <h2 mat-dialog-title>Booking Details</h2>
    <mat-dialog-content>
      <p><strong>Guest:</strong> {{ data.guestName }}</p>
      <p><strong>Phone:</strong> {{ data.phoneNumber }}</p>
      <p><strong>Room ID:</strong> {{ data.roomId }}</p>
      <p><strong>From:</strong> {{ data.startDate }}</p>
      <p><strong>To:</strong> {{ data.endDate }}</p>
      <p><strong>Total Price:</strong> '$'{{ data.totalPrice }}</p>
    </mat-dialog-content>
   <mat-dialog-actions align="end">
  <button mat-button (click)="onClose()">Close</button>
  <button mat-raised-button color="warn"
          *ngIf="data.canDelete"
          (click)="onDelete()">Cancel Booking</button>
</mat-dialog-actions>

  `
})
export class BookingDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Booking,
    private dialogRef: MatDialogRef<BookingDialogComponent>
  ) { }

  onClose() {
    this.dialogRef.close();
  }

  onDelete() {
    this.dialogRef.close({ delete: true });
  }
}
