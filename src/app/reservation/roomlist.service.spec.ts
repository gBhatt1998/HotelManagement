import { TestBed } from '@angular/core/testing';

import { RoomlistService } from './roomlist.service';

describe('RoomlistService', () => {
  let service: RoomlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
