import { TestBed } from '@angular/core/testing';

import { LaborServices } from './labor-services';

describe('LaborServices', () => {
  let service: LaborServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaborServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
