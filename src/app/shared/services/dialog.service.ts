  import { Injectable } from '@angular/core';
  import { MatDialog, MatDialogRef } from '@angular/material/dialog';
  import { DialogComponent, DialogData } from '../components/dialog/dialog.component';

  @Injectable({ providedIn: 'root' })
  export class DialogService {
    constructor(private dialog: MatDialog) {}
    openLoading(message: string, title?: string): MatDialogRef<DialogComponent> {
      return this.dialog.open(DialogComponent, {
        disableClose: true,
        data: {
          mode: 'loading',
          message,
          title
        }
      });
    }

    openError(data: Omit<DialogData, 'mode'>): MatDialogRef<DialogComponent> {
      return this.dialog.open(DialogComponent, {
        data: {
          ...data,
          mode: 'error'
        }
      });
    }

    openSuccess(data: Omit<DialogData, 'mode'>): MatDialogRef<DialogComponent> {
      return this.dialog.open(DialogComponent, {
        data: {
          ...data,
          mode: 'success'
        }
      });
    }
  }