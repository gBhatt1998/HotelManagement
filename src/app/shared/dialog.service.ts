import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openLoading(message: string = 'Processing...', title: string = 'Please wait'): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      disableClose: true,
      data: { message, title, loading: true }
    });
  }

  
  openMessage(message: string, title: string = 'Notification', error = false): void {
    this.dialog.open(DialogComponent, {
      data: { message, title, loading: false, error }
    });
  }
}