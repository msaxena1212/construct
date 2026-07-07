import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentInventoryHistory } from './equipment-inventory-history';

describe('EquipmentInventoryHistory', () => {
  let component: EquipmentInventoryHistory;
  let fixture: ComponentFixture<EquipmentInventoryHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentInventoryHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentInventoryHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
