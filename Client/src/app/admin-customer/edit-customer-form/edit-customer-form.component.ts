import { Component, Input, OnInit } from '@angular/core';
import { CustomerFormValues } from 'src/app/shared/models/customers';
import { AdminCustomerService } from '../admin-customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer-form',
  templateUrl: './edit-customer-form.component.html',
  styleUrls: ['./edit-customer-form.component.scss']
})
export class EditCustomerFormComponent implements OnInit {
  @Input() customer!: CustomerFormValues;

  constructor(
    private adminCustomerService: AdminCustomerService,
    private route: ActivatedRoute,
    private router: Router) {
    this.customer = new CustomerFormValues();
  }

  ngOnInit(): void {

  }
  onSubmit(customer: CustomerFormValues) {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.route.snapshot.url[0].path == 'edit') {
      const updateCustomer = { ...this.customer, customer };
      this.adminCustomerService.updateCustomer(updateCustomer, +id!).subscribe((response: any) => {
        this.router.navigate(['/admin-customer']);
      });
    } else {
      const newCustomer = { ...customer };
      this.adminCustomerService.createCustomer(newCustomer).subscribe((response: any) => {
        this.router.navigate(['/admin-customer']);
      })
    }
  }


}
