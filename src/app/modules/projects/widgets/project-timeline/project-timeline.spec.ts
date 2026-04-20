import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTimeline } from './project-timeline';

describe('ProjectTimeline', () => {
  let component: ProjectTimeline;
  let fixture: ComponentFixture<ProjectTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectTimeline],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
