import { TestBed } from '@angular/core/testing';

import { VendorsTaskServices } from './vendors-task-services';

describe('VendorsTaskServices', () => {
  let service: VendorsTaskServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorsTaskServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
