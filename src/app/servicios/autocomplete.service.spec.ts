import { TestBed } from '@angular/core/testing';

import { AutocompleteService } from './autocomplete.service';

describe('UtocompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutocompleteService = TestBed.get(UtocompleteService);
    expect(service).toBeTruthy();
  });
});
