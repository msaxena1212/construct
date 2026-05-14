import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMaster } from './material-master';

describe('MaterialMaster', () => {
  let component: MaterialMaster;
  let fixture: ComponentFixture<MaterialMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialMaster],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialMaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
