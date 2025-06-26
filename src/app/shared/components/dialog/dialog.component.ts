import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  message: string;
  title?: string;
  mode: 'loading' | 'success' | 'error';
  statusCode?: number;
  close?: boolean;
  showRetry?: boolean;            
  onRetry?: () => void;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
  retry(): void {
    this.dialogRef.close(); 
    if (this.data.onRetry) {
      this.data.onRetry(); 
    }
  }
}