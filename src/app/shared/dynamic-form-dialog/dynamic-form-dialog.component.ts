import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DynamicDialogData {
  formTitle: string;
  formFields: { key: string; label: string; type: string; value?: string | number }[];
  isEdit: boolean;
  moduleName: string;
}

@Component({
  selector: 'app-dynamic-form-dialog',
  templateUrl: './dynamic-form-dialog.component.html',
  styleUrls: ['./dynamic-form-dialog.component.css']
})
export class DynamicFormDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DynamicFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DynamicDialogData,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const group: Record<string, any> = {};

    this.data.formFields.forEach(field => {
      group[field.key] = [field.value || '', Validators.required];
    });

    this.form = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
