import { TestBed } from '@angular/core/testing';

import { MaterialMaster } from './material-master';

describe('MaterialMaster', () => {
  let service: MaterialMaster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialMaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
