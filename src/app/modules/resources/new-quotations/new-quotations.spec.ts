import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuotations } from './new-quotations';

describe('NewQuotations', () => {
  let component: NewQuotations;
  let fixture: ComponentFixture<NewQuotations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewQuotations],
    }).compileComponents();

    fixture = TestBed.createComponent(NewQuotations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
