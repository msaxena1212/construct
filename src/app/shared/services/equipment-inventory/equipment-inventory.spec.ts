import { TestBed } from '@angular/core/testing';

import { EquipmentInventoryService } from './equipment-inventory';

describe('EquipmentInventoryService', () => {
  let service: EquipmentInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
