import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { AdminCustomerService } from 'src/app/admin-customer/admin-customer.service';
import { CustomerFormValues } from 'src/app/shared/models/customers';

@Component({
  selector: 'app-customer-info-form',
  templateUrl: './customer-info-form.component.html',
  styleUrl: './customer-info-form.component.scss'
})
export class CustomerInfoFormComponent implements OnInit {
  @Input() customer!: CustomerFormValues;
  vehicleId!: number;

  constructor(
    private adminCustomerService: AdminCustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionStorage: SessionStorageService

  ) {
    this.customer = new CustomerFormValues();
  }

  ngOnInit(): void {
    this.vehicleId = this.sessionStorage.retrieve('vehicleId');
  }

  onSubmit(customer: CustomerFormValues) {
    const newCustomer = { ...customer };
    this.adminCustomerService.createCustomer(newCustomer).subscribe((response: any) => {
      const customerId = response.id;
      this.sessionStorage.store('customerId', customerId);
      this.router.navigate(['/reservation-info']);
    })
  }

}
