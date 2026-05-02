import { TestBed } from '@angular/core/testing';

import { VendorsServices } from './vendors-services';

describe('VendorsServices', () => {
  let service: VendorsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
