import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/models/customers';
import { CustomerParams } from '../shared/models/customerParams';
import { CustomerService } from '../customer/customer.service';
import { AdminCustomerService } from './admin-customer.service';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.scss']
})
export class AdminCustomerComponent implements OnInit {
  customers!: Customer[];
  totalCount!: number;
  customerParams!: CustomerParams;

  constructor(private customerService: CustomerService, private adminService: AdminCustomerService) {
    this.customerParams = this.customerService.getCustomerParams();
  }

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers() {
    this.customerService.getCustomers(this.customerParams).subscribe({
      next: response => {
        this.customers = response.data;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    });
  }

  onPageChanged(event: any) {
    const params = this.customerService.getCustomerParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.customerService.setCustomerParams(params);
      this.getCustomers();
    }
  }

  deleteCustomer(id: number) {
    this.adminService.deleteCustomer(id).subscribe((response: any) => {
      this.customers.splice(this.customers.findIndex(p => p.id === id), 1);
      this.totalCount--;
    });
  }
}
