import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormDialog } from './task-form-dialog';

describe('TaskFormDialog', () => {
  let component: TaskFormDialog;
  let fixture: ComponentFixture<TaskFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
