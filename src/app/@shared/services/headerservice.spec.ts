import { TestBed } from '@angular/core/testing';

import { Headerservice } from './headerservice';

describe('Headerservice', () => {
  let service: Headerservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Headerservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
