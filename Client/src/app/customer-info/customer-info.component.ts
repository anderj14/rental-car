import { Component, OnInit } from '@angular/core';
import { Customer, CustomerFormValues } from '../shared/models/customers';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../admin-customer/customer.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss'
})
export class CustomerInfoComponent implements OnInit {
  customer!: Customer;
  customerFormValues!: CustomerFormValues;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {
    this.customerFormValues = new CustomerFormValues();
  }

  ngOnInit(): void {
  }
}
