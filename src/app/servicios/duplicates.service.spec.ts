import { TestBed } from '@angular/core/testing';

import { DuplicatesService } from './duplicates.service';

describe('DuplicatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DuplicatesService = TestBed.get(DuplicatesService);
    expect(service).toBeTruthy();
  });
});
