import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbacRoleDialog } from './rbac-role-dialog';

describe('RbacRoleDialog', () => {
  let component: RbacRoleDialog;
  let fixture: ComponentFixture<RbacRoleDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RbacRoleDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbacRoleDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
