import { TestBed } from '@angular/core/testing';

import { ConteosService } from './conteos.service';

describe('ConteosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConteosService = TestBed.get(ConteosService);
    expect(service).toBeTruthy();
  });
});
