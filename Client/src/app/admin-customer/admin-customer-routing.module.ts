import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminCustomerComponent } from './admin-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

const routes: Routes = [
  { path: 'create', component: EditCustomerComponent, data: { breadcrumb: 'Create' } },
  { path: 'edit/:id', component: EditCustomerComponent, data: { breadcrumb: 'Edit' } },
  { path: ':id', component: CustomerDetailsComponent, data: { breadcrumb: { alias: 'customerDetails' } } },
  { path: '', component: AdminCustomerComponent }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminCustomerRoutingModule { }
