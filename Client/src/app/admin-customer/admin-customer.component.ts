import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../shared/models/customers';
import { CustomerParams } from '../shared/models/customerParams';
import { AdminCustomerService } from './admin-customer.service';
import { AccountService } from '../account/account.service';
import { User } from '../shared/models/user';
import { Observable } from 'rxjs';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.scss']
})
export class AdminCustomerComponent implements OnInit {

  @ViewChild('search') searchTerm?: ElementRef;

  customers!: Customer[];
  totalCount!: number;
  customerParams!: CustomerParams;
  currentUser$!: Observable<User | null>;
  isAdmin$!: Observable<boolean>;

  constructor(private customerService: CustomerService,
    private adminCustomerService: AdminCustomerService,
    public accountService: AccountService) {
    this.customerParams = this.customerService.getCustomerParams();
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;

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

  onSortSelected(event: any) {
    this.customerParams.sort = event.target.value;
    this.getCustomers();
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
    this.adminCustomerService.deleteCustomer(id).subscribe(
      () => {
        this.customers = this.customers.filter(p => p.id !== id);
        this.totalCount--;
      }
    );
  }
  
  onSearch() {
    this.customerParams.search = this.searchTerm?.nativeElement.value;
    this.customerParams.pageNumber = 1;
    this.getCustomers();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.customerParams = new CustomerParams();
    this.getCustomers();
  }
}
