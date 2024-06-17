import { Component, OnInit } from '@angular/core';
import { Customer, CustomerFormValues } from '../shared/models/customers';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss'
})
export class CustomerInfoComponent implements OnInit {
  customer!: Customer;
  customerFormValues!: CustomerFormValues;

  constructor(
  ) {
    this.customerFormValues = new CustomerFormValues();
  }

  ngOnInit(): void {
  }
}
