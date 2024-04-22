import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer, CustomerFormValues } from 'src/app/shared/models/customers';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customer!: Customer;
  customerFormValues!: CustomerFormValues;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {
    this.customerFormValues = new CustomerFormValues();
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path == 'edit') {
      this.loadCustomer();
    }
  }

  loadCustomer() {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomer(+id!).subscribe((response: any) => {
      this.customer = response;
      this.customerFormValues = { ...response };
    });

  }


}
