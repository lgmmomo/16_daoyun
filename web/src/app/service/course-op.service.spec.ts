import { TestBed } from '@angular/core/testing';

import { CourseOpService } from './course-op.service';

describe('CourseOpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseOpService = TestBed.get(CourseOpService);
    expect(service).toBeTruthy();
  });
});
