import { TestBed } from '@angular/core/testing';

import { HotelCardService } from './hotel-card.service';

describe('HotelCardService', () => {
  let service: HotelCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
