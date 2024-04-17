import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { Customer } from 'src/app/shared/models/customers';
import { User } from 'src/app/shared/models/user';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  customer!: Customer;

  constructor(
    private customerService: CustomerService,
    private activateRoute: ActivatedRoute,
    public accountService: AccountService,
    private bcService: BreadcrumbService,
  ) { }

  currentUser$!: Observable<User | null>;
  isAdmin$!: Observable<boolean>;

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;

    this.loadVehicle();
  }

  loadVehicle() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) this.customerService.getCustomer(+id).subscribe({
      next: customer => {
        this.customer = customer;
        this.bcService.set('@customerDetails', customer.customerName);
      },
      error: error => console.log(error)
    });
  }
}
