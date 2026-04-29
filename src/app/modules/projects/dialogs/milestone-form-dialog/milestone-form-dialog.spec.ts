import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneFormDialog } from './milestone-form-dialog';

describe('MilestoneFormDialog', () => {
  let component: MilestoneFormDialog;
  let fixture: ComponentFixture<MilestoneFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MilestoneFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(MilestoneFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
