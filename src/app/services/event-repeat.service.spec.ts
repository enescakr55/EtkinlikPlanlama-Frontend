import { TestBed } from '@angular/core/testing';

import { EventRepeatService } from './event-repeat.service';

describe('EventRepeatService', () => {
  let service: EventRepeatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventRepeatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
