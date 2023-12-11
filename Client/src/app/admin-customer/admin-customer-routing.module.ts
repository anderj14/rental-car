import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminCustomerComponent } from './admin-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

const routes: Routes = [
  { path: '', component: AdminCustomerComponent },
  { path: 'create', component: EditCustomerComponent, data: { breadcrumb: 'Create' } },
  { path: 'edit/:id', component: EditCustomerComponent, data: { breadcrumb: 'Edit' } }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminCustomerRoutingModule { }
