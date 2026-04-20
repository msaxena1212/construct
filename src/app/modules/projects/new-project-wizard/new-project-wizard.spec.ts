import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectWizard } from './new-project-wizard';

describe('NewProjectWizard', () => {
  let component: NewProjectWizard;
  let fixture: ComponentFixture<NewProjectWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewProjectWizard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProjectWizard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
