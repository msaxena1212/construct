import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbacMaster } from './rbac-master';

describe('RbacMaster', () => {
  let component: RbacMaster;
  let fixture: ComponentFixture<RbacMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RbacMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbacMaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
