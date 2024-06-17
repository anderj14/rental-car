import { TestBed } from '@angular/core/testing';

import { FuelFormService } from './fuel-form.service';

describe('FuelFormService', () => {
  let service: FuelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
