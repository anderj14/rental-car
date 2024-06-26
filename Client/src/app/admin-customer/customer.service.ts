import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerParams } from '../shared/models/customerParams';
import { Customer } from '../shared/models/customers';
import { Pagination } from '../shared/models/Pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = environment.apiUrl;
  
  customerParams = new CustomerParams();

  constructor(private http: HttpClient) { }

  getCustomers(customerParams: CustomerParams) {
    let params = new HttpParams();

    params = params.append('sort', customerParams.sort);
    params = params.append('pageIndex', customerParams.pageNumber);
    params = params.append('pageSize', customerParams.pageSize);
    if (customerParams.search) params = params.append('search', customerParams.search);

    return this.http.get<Pagination<Customer[]>>(this.baseUrl + 'customers', { params });
  }

  setCustomerParams(params: CustomerParams) {
    this.customerParams = params;
  }

  getCustomerParams() {
    return this.customerParams;
  }

  getCustomer(id: number) {
    return this.http.get<Customer>(this.baseUrl + 'customers/' + id);
  }
}
