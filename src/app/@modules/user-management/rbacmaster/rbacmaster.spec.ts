import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rbacmaster } from './rbacmaster';

describe('Rbacmaster', () => {
  let component: Rbacmaster;
  let fixture: ComponentFixture<Rbacmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rbacmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rbacmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
