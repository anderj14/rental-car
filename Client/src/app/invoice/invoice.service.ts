import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/Pagination';
import { Invoice } from '../shared/models/invoice';
import { Observable } from 'rxjs';
import { InvoiceParams } from '../shared/models/invoiceParams';
import { Customer } from '../shared/models/customers';
import { Reservation } from '../shared/models/reservation';
import { Vehicle } from '../shared/models/vehicles';
import { Insurance } from '../shared/models/insurance';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {
  baseUrl = 'https://localhost:5001/api/';
  invoiceParams = new InvoiceParams();

  constructor(private http: HttpClient) { }

  getInvoices(invoiceParams: InvoiceParams): Observable<Pagination<Invoice[]>> {
    let params = new HttpParams();

    params = params.append('sort', invoiceParams.sort);
    params = params.append('pageIndex', invoiceParams.pageNumber);
    params = params.append('pageSize', invoiceParams.pageSize);
    if (invoiceParams.search) params = params.append('search', invoiceParams.search);

    return this.http.get<Pagination<Invoice[]>>(this.baseUrl + 'invoices', { params });
  }
  
  setInvoiceParams(params: InvoiceParams) {
    this.invoiceParams = params;
  }

  getInvoiceParams() {
    return this.invoiceParams;
  }

  getInvoice(invoiceId: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.baseUrl}invoices/${invoiceId}`);
  }

  getCustomers() {
    return this.http.get<Customer[]>(`${this.baseUrl}customers`);
  }
  getReservations() {
    return this.http.get<Reservation[]>(`${this.baseUrl}reservations`);
  }


  getCustomerById(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}customers/${customerId}`);
  }
  getReservationById(reservationId: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}reservations/${reservationId}`);
  }
}
