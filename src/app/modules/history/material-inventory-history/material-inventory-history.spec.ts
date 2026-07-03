import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialInventoryHistory } from './material-inventory-history';

describe('MaterialInventoryHistory', () => {
  let component: MaterialInventoryHistory;
  let fixture: ComponentFixture<MaterialInventoryHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialInventoryHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialInventoryHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
