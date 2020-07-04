import { TestBed } from '@angular/core/testing';

import { TeacherOpService } from './teacher-op.service';

describe('TeacherOpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherOpService = TestBed.get(TeacherOpService);
    expect(service).toBeTruthy();
  });
});
