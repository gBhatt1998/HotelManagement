import { TestBed } from '@angular/core/testing';

import { AllReservationService } from './all-reservation.service';

describe('AllReservationService', () => {
  let service: AllReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
