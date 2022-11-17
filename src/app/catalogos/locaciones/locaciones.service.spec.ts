import { TestBed } from '@angular/core/testing';

import { LocacionesService } from './locaciones.service';

describe('LocacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocacionesService = TestBed.get(LocacionesService);
    expect(service).toBeTruthy();
  });
});
