import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHistory } from './employee-history';

describe('EmployeeHistory', () => {
  let component: EmployeeHistory;
  let fixture: ComponentFixture<EmployeeHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
