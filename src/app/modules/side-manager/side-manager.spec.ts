import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideManager } from './side-manager';

describe('SideManager', () => {
  let component: SideManager;
  let fixture: ComponentFixture<SideManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideManager],
    }).compileComponents();

    fixture = TestBed.createComponent(SideManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
