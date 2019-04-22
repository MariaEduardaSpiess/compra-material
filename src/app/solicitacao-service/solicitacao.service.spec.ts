import { TestBed } from '@angular/core/testing';

import { SolicitacaoService } from './solicitacao.service';

describe('SolicitacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolicitacaoService = TestBed.get(SolicitacaoService);
    expect(service).toBeTruthy();
  });
});
