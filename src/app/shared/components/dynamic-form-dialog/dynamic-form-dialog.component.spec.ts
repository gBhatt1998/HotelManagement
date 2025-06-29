import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormDialogComponent } from './dynamic-form-dialog.component';

describe('DynamicFormDialogComponent', () => {
  let component: DynamicFormDialogComponent;
  let fixture: ComponentFixture<DynamicFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormDialogComponent]
    });
    fixture = TestBed.createComponent(DynamicFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
