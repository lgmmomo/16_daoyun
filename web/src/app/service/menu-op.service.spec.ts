import { TestBed } from '@angular/core/testing';

import { MenuOpService } from './menu-op.service';

describe('MenuOpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuOpService = TestBed.get(MenuOpService);
    expect(service).toBeTruthy();
  });
});
