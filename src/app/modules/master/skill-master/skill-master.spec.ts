import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillMaster } from './skill-master';

describe('SkillMaster', () => {
  let component: SkillMaster;
  let fixture: ComponentFixture<SkillMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillMaster],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillMaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
