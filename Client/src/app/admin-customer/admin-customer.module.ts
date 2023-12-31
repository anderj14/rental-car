import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCustomerComponent } from './admin-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { SharedModule } from '../shared/shared.module';
import { AdminCustomerRoutingModule } from './admin-customer-routing.module';
import { EditCustomerFormComponent } from './edit-customer-form/edit-customer-form.component';

@NgModule({
  declarations: [
    AdminCustomerComponent,
    EditCustomerComponent,
    EditCustomerFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminCustomerRoutingModule
  ]
})
export class AdminCustomerModule { }
