import { TestBed } from '@angular/core/testing';

import { Leadservice } from './leadservice';

describe('Leadservice', () => {
  let service: Leadservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Leadservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
