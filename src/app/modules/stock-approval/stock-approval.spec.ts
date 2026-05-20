import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockApproval } from './stock-approval';

describe('StockApproval', () => {
  let component: StockApproval;
  let fixture: ComponentFixture<StockApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockApproval],
    }).compileComponents();

    fixture = TestBed.createComponent(StockApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
