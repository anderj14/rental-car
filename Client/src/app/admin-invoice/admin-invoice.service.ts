import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceFormValues } from '../shared/models/invoice';

@Injectable({
  providedIn: 'root'
})
export class AdminInvoiceService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  createInvoice(invoice: InvoiceFormValues) {
    return this.http.post(this.baseUrl + 'invoices/', invoice);
  }

  updateInvoice(invoice: InvoiceFormValues, id: number) {
    return this.http.put(this.baseUrl + 'invoices/' + id, invoice);
  }

  deleteInvoice(id: number) {
    return this.http.delete(this.baseUrl + 'invoices/' + id, { responseType: 'text' });
  }
}
