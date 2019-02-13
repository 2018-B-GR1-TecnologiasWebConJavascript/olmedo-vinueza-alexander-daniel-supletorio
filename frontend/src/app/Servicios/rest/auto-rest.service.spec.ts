import { TestBed } from '@angular/core/testing';

import { AutoRestService } from './auto-rest.service';

describe('AutoRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoRestService = TestBed.get(AutoRestService);
    expect(service).toBeTruthy();
  });
});
