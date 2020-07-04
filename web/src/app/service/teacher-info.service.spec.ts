import { TestBed } from '@angular/core/testing';

import { TeacherInfoService } from './teacher-info.service';

describe('TeacherInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherInfoService = TestBed.get(TeacherInfoService);
    expect(service).toBeTruthy();
  });
});
