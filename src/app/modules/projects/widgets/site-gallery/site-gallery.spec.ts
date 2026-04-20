import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteGallery } from './site-gallery';

describe('SiteGallery', () => {
  let component: SiteGallery;
  let fixture: ComponentFixture<SiteGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteGallery],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteGallery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
