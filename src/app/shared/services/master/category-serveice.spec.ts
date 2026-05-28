import { TestBed } from '@angular/core/testing';

import { CategoryServeice } from './category-serveice';

describe('CategoryServeice', () => {
  let service: CategoryServeice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryServeice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
