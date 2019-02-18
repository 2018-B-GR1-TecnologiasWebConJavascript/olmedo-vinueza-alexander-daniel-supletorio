import { TestBed } from '@angular/core/testing';

import { FacturaRestService } from './factura-rest.service';

describe('FacturaRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacturaRestService = TestBed.get(FacturaRestService);
    expect(service).toBeTruthy();
  });
});
