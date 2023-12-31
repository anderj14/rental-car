import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../shared/models/customers';
import { CustomerParams } from '../shared/models/customerParams';
import { CustomerService } from './customer.service';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @ViewChild('search') searchTerm?: ElementRef;
  customers!: Customer[];
  customerParams = new CustomerParams();

  totalCount = 0;
  currentUser$!: Observable<User | null>;
  isAdmin$!: Observable<boolean>;
  
  constructor(private customerService: CustomerService, public accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;

    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers(this.customerParams).subscribe({
      next: response => {
        this.customers = response.data;
        this.customerParams.pageNumber = response.pageIndex;
        this.customerParams.pageSize = response.pageSize;
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
    if (this.customerParams.pageNumber !== event) {
      this.customerParams.pageNumber = event;
      this.getCustomers();
    }
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
