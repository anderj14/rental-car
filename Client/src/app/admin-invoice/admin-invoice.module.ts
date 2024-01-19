import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminInvoiceRoutingModule } from './admin-invoice-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminInvoiceComponent } from './admin-invoice.component';
import { EditInvoiceFormComponent } from './edit-invoice-form/edit-invoice-form.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    AdminInvoiceComponent,
    EditInvoiceFormComponent,
    EditInvoiceComponent
  ],
  imports: [
    CommonModule,
    AdminInvoiceRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdminInvoiceModule { }
