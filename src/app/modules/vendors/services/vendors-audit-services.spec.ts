import { TestBed } from '@angular/core/testing';

import { VendorsAuditServices } from './vendors-audit-services';

describe('VendorsAuditServices', () => {
  let service: VendorsAuditServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorsAuditServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
