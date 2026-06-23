import { TestBed } from '@angular/core/testing';

import { VendorsHistoryServices } from './vendors-history-services';

describe('VendorsHistoryServices', () => {
  let service: VendorsHistoryServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorsHistoryServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
