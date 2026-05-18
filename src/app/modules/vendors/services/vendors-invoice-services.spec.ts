import { TestBed } from '@angular/core/testing';

import { VendorsInvoiceServices } from './vendors-invoice-services';

describe('VendorsInvoiceServices', () => {
  let service: VendorsInvoiceServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorsInvoiceServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
