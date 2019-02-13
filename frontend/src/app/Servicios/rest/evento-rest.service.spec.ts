import { TestBed } from '@angular/core/testing';

import { EventoRestService } from './evento-rest.service';

describe('EventoRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventoRestService = TestBed.get(EventoRestService);
    expect(service).toBeTruthy();
  });
});
