import { TestBed } from '@angular/core/testing';

import { EventJoinService } from './event-join.service';

describe('EventJoinService', () => {
  let service: EventJoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventJoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
