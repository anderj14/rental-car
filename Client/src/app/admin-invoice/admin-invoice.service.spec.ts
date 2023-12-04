import { TestBed } from '@angular/core/testing';

import { AdminInvoiceService } from './admin-invoice.service';

describe('AdminInvoiceService', () => {
  let service: AdminInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
