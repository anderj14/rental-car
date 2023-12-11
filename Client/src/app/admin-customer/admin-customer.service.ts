import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerFormValues } from '../shared/models/customers';

@Injectable({
  providedIn: 'root'
})
export class AdminCustomerService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  createCustomer(customer: CustomerFormValues) {
    return this.http.post(this.baseUrl + 'customers', customer);
  }

  updateCustomer(customer: CustomerFormValues, id: number) {
    return this.http.put(this.baseUrl + 'customers/' + id, customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete(this.baseUrl + 'customers/' + id, { responseType: 'text' });
  }
}
