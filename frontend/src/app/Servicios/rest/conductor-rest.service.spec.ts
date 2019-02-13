import { TestBed } from '@angular/core/testing';

import { ConductorRestService } from './conductor-rest.service';

describe('ConductorRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConductorRestService = TestBed.get(ConductorRestService);
    expect(service).toBeTruthy();
  });
});
