import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHistory } from './project-history';

describe('ProjectHistory', () => {
  let component: ProjectHistory;
  let fixture: ComponentFixture<ProjectHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
