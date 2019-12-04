import { TestBed } from '@angular/core/testing';

import { ServiceoneService } from './serviceone.service';

describe('ServiceoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceoneService = TestBed.get(ServiceoneService);
    expect(service).toBeTruthy();
  });
});
