import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DynamicDialogData {
  formTitle: string;
  isEdit: boolean;
  moduleName: string;
  formFields: {
    key: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'multiselect' | 'textarea' | 'select';
    value?: string | number | string[] | number[];
    options?: { label: string; value: any }[];
    validators?: {
      name: 'minlength' | 'maxlength' | 'min' | 'max' | 'pattern';
      value: number | string;
      message: string;
    }[];
  }[];
  onFieldChange?: (fieldKey: string, value: any, patchForm: (key: string, value: any) => void) => void;
}

@Component({
  selector: 'app-dynamic-form-dialog',
  templateUrl: './dynamic-form-dialog.component.html',
  styleUrls: ['./dynamic-form-dialog.component.css']
})
export class DynamicFormDialogComponent implements OnInit {
  form!: FormGroup;
  pickerMap: { [key: string]: any } = {};

  constructor(
    public dialogRef: MatDialogRef<DynamicFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DynamicDialogData,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const group: Record<string, any> = {};

    this.data.formFields.forEach((field) => {
      const validators = [];

      if (field.validators) {
        for (const validator of field.validators) {
          switch (validator.name) {
            case 'minlength':
              validators.push(Validators.minLength(validator.value as number));
              break;
            case 'maxlength':
              validators.push(Validators.maxLength(validator.value as number));
              break;
            case 'min':
              validators.push(Validators.min(validator.value as number));
              break;
            case 'max':
              validators.push(Validators.max(validator.value as number));
              break;
            case 'pattern':
              validators.push(Validators.pattern(validator.value as string));
              break;
          }
        }
      }

      validators.push(Validators.required);
      group[field.key] = [field.value ?? '', validators];
    });

    this.form = this.fb.group(group);

    // Listen for dynamic field changes
    if (this.data.onFieldChange) {
      this.data.formFields.forEach((field) => {
        this.form.get(field.key)?.valueChanges.subscribe((value) => {
          this.data.onFieldChange!(field.key, value, this.patchFormValue.bind(this));
        });
      });
    }

    this.cdRef.detectChanges();
  }

  patchFormValue(key: string, value: any): void {
    this.form.patchValue({ [key]: value });
    this.cdRef.detectChanges();
  }

  getErrorMessage(fieldKey: string): string {
    const control: AbstractControl | null = this.form.get(fieldKey);
    if (!control || !control.errors) return '';

    const field = this.data.formFields.find((f) => f.key === fieldKey);
    if (!field) return '';

    if (control.errors['required']) {
      return `${field.label} is required`;
    }

    for (const validator of field.validators || []) {
      if (control.errors[validator.name]) {
        return validator.message;
      }
    }

    return `${field.label} is invalid`;
  }

  getFieldClass(key: string): string {
    return key === 'description' ? 'full-width' : 'compact-field';
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
