import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { AdminInvoiceComponent } from './admin-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';

const routes: Routes = [
  { path: '', component: AdminInvoiceComponent },
  { path: 'create', component: EditInvoiceComponent, data: { breadcrumb: 'Create' } },
  { path: 'edit/:id', component: EditInvoiceComponent, data: { breadcrumb: 'Edit' } },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminInvoiceRoutingModule { }
