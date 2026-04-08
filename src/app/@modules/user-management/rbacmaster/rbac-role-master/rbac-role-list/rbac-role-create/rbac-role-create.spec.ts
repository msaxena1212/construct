import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbacRoleCreate } from './rbac-role-create';

describe('RbacRoleCreate', () => {
  let component: RbacRoleCreate;
  let fixture: ComponentFixture<RbacRoleCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RbacRoleCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbacRoleCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
