import { TestBed } from '@angular/core/testing';

import { ProjectHistoryServices } from './project-history-services';

describe('ProjectHistoryServices', () => {
  let service: ProjectHistoryServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectHistoryServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
