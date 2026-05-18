import { TestBed } from '@angular/core/testing';

import { SkillMasterServices } from './skill-master-services';

describe('SkillMasterServices', () => {
  let service: SkillMasterServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillMasterServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
