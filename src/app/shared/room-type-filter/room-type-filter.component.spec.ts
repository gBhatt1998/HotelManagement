import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeFilterComponent } from './room-type-filter.component';

describe('RoomTypeFilterComponent', () => {
  let component: RoomTypeFilterComponent;
  let fixture: ComponentFixture<RoomTypeFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomTypeFilterComponent]
    });
    fixture = TestBed.createComponent(RoomTypeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
