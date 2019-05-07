import { TestBed } from '@angular/core/testing';

import { ConsultaCepService } from './consulta-cep.service';

describe('CosultaCepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaCepService = TestBed.get(ConsultaCepService);
    expect(service).toBeTruthy();
  });
});
