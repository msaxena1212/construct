import { TestBed } from '@angular/core/testing';

import { TopLoaderservice } from './top-loaderservice';

describe('TopLoaderservice', () => {
  let service: TopLoaderservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopLoaderservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
