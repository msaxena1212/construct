import { TestBed } from '@angular/core/testing';

import { VendorsLaborServices } from './vendors-labor-services';

describe('VendorsLaborServices', () => {
  let service: VendorsLaborServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorsLaborServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
