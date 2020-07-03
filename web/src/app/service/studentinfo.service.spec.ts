import { TestBed } from '@angular/core/testing';

import { StudentinfoService } from './studentinfo.service';

describe('StudentinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentinfoService = TestBed.get(StudentinfoService);
    expect(service).toBeTruthy();
  });
});
