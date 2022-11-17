import { TestBed } from '@angular/core/testing';

import { CentroConsumoService } from './centro-consumo.service';

describe('CentroConsumoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CentroConsumoService = TestBed.get(CentroConsumoService);
    expect(service).toBeTruthy();
  });
});
