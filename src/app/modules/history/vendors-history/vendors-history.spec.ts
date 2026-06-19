import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsHistory } from './vendors-history';

describe('VendorsHistory', () => {
  let component: VendorsHistory;
  let fixture: ComponentFixture<VendorsHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorsHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorsHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
