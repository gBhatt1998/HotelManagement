import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipPopoverComponent } from './chip-popover.component';

describe('ChipPopoverComponent', () => {
  let component: ChipPopoverComponent;
  let fixture: ComponentFixture<ChipPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChipPopoverComponent]
    });
    fixture = TestBed.createComponent(ChipPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
