import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbacRoleList } from './rbac-role-list';

describe('RbacRoleList', () => {
  let component: RbacRoleList;
  let fixture: ComponentFixture<RbacRoleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RbacRoleList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbacRoleList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
