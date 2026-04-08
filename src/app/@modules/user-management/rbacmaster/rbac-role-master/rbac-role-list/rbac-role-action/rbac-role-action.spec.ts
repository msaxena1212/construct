import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbacRoleAction } from './rbac-role-action';

describe('RbacRoleAction', () => {
  let component: RbacRoleAction;
  let fixture: ComponentFixture<RbacRoleAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RbacRoleAction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbacRoleAction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
