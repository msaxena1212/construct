import { TestBed } from '@angular/core/testing';

import { EquipmentInventoryHistoryServices } from './equipment-inventory-history-services';

describe('EquipmentInventoryHistoryServices', () => {
  let service: EquipmentInventoryHistoryServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentInventoryHistoryServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
