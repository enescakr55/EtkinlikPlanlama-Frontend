import { TestBed } from '@angular/core/testing';

import { UpcomingEventService } from './upcoming-event.service';

describe('UpcomingEventService', () => {
  let service: UpcomingEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpcomingEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
