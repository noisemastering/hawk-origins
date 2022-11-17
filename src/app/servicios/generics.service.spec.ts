import { TestBed } from '@angular/core/testing';

import { GenericsService } from './generics.service';

describe('GenericsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericsService = TestBed.get(GenericsService);
    expect(service).toBeTruthy();
  });
});
