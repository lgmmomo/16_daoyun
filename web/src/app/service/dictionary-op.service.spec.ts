import { TestBed } from '@angular/core/testing';

import { DictionaryOpService } from './dictionary-op.service';

describe('DictionaryOpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DictionaryOpService = TestBed.get(DictionaryOpService);
    expect(service).toBeTruthy();
  });
});
