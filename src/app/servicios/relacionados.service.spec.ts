import { TestBed } from '@angular/core/testing';

import { RelacionadosService } from './relacionados.service';

describe('RelacionadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelacionadosService = TestBed.get(RelacionadosService);
    expect(service).toBeTruthy();
  });
});
