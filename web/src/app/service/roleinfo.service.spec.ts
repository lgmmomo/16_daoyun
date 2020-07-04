import { TestBed } from '@angular/core/testing';

import { RoleinfoService } from './roleinfo.service';

describe('RoleinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleinfoService = TestBed.get(RoleinfoService);
    expect(service).toBeTruthy();
  });
});
