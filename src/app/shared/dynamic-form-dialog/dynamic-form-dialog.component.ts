import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type FieldType = 'text' | 'number' | 'date' | 'multiselect' | 'textarea' | 'select' | 'boolean'  | 'button'; //;

export interface FormFieldValidator {
  name: 'minlength' | 'maxlength' | 'min' | 'max' | 'pattern';
  value: number | string;
  message: string;
}

export interface FormFieldOption {
  label: string;
  value: string | number;
}

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  value?: string | number | string[] | number[] | boolean;
  options?: FormFieldOption[];
  validators?: FormFieldValidator[];
  required?: boolean;
  disabled?: boolean;
}

export interface DynamicDialogData {
  formTitle: string;
  isEdit: boolean;
  moduleName: string;
  formFields: FormField[];
  onFieldChange?: (
    fieldKey: string,
    value: string | number | string[] | number[] | boolean | null,
    patchForm: (key: string, value: any) => void,
     formValue: any
  ) => void;
    suggestedRoomNos?: number[]; // ✅ Add this line

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
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const group: { [key: string]: any } = {};

    this.data.formFields.forEach((field: FormField) => {
        if (field.type === 'button') return; // ✅ Skip adding button fields to form group

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

      if (field.required !== false) {
        validators.push(Validators.required);
      }

      group[field.key] = this.fb.control(
        { value: field.value ?? '', disabled: field.disabled ?? false },
        validators
      );
    });

    this.form = this.fb.group(group);

    // Handle dynamic value changes
    if (this.data.onFieldChange) {
  this.data.formFields.forEach((field) => {
    const control = this.form.get(field.key);
    if (control && field.type !== 'button') {
      control.valueChanges.subscribe((value) => {
        this.data.onFieldChange!(
          field.key,
          value,
          this.patchFormValue.bind(this),
          this.form.getRawValue()
        );
      });
    }
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

 
  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
  get formattedSuggestedRooms(): string[] {
  return this.data.suggestedRoomNos?.map(num => `Room ${num}`) || [];
}
handleButtonClick(fieldKey: string): void {
  if (this.data.onFieldChange) {
    this.data.onFieldChange(
      fieldKey,
      null,
      this.patchFormValue.bind(this),
      this.form.getRawValue()
    );
  }
}

}
