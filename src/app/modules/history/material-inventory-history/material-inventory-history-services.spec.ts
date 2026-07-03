import { TestBed } from '@angular/core/testing';

import { MaterialInventoryHistoryServices } from './material-inventory-history-services';

describe('MaterialInventoryHistoryServices', () => {
  let service: MaterialInventoryHistoryServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialInventoryHistoryServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
