import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAddModal } from './vendor-add-modal';

describe('VendorAddModal', () => {
  let component: VendorAddModal;
  let fixture: ComponentFixture<VendorAddModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorAddModal],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorAddModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
