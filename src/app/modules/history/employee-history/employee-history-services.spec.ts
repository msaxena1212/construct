import { TestBed } from '@angular/core/testing';

import { EmployeeHistoryServices } from './employee-history-services';

describe('EmployeeHistoryServices', () => {
  let service: EmployeeHistoryServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeHistoryServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
