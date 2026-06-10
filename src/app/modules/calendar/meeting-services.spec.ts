import { TestBed } from '@angular/core/testing';

import { MeetingServices } from './meeting-services';

describe('MeetingServices', () => {
  let service: MeetingServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
