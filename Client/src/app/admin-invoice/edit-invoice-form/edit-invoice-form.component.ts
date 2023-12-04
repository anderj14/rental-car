import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/models/customers';
import { InvoiceFormValues } from 'src/app/shared/models/invoice';
import { Reservation } from 'src/app/shared/models/reservation';
import { AdminInvoiceService } from '../admin-invoice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-invoice-form',
  templateUrl: './edit-invoice-form.component.html',
  styleUrl: './edit-invoice-form.component.scss'
})
export class EditInvoiceFormComponent implements OnInit {

  @Input() invoice!: InvoiceFormValues;
  @Input() reservations!: Reservation[];
  @Input() customers!: Customer[];

  constructor(
    private adminInvoiceService: AdminInvoiceService,
    private route: ActivatedRoute,
    private router: Router) {
    this.invoice = new InvoiceFormValues();
  }

  ngOnInit(): void {
  }

  updatePrice(event: any) {
    this.invoice.totalAmount = event;
  }

  onSubmit(invoice: InvoiceFormValues) {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedInvoice = { ...this.invoice, ...invoice, totalAmount: +invoice.totalAmount };
      this.adminInvoiceService.updateInvoice(updatedInvoice, +id!).subscribe((response: any) => {
        this.router.navigate(['/admin-invoice']);
      });
    } else {
      const newInvoice = { ...invoice, totalAmount: +invoice.totalAmount };
      this.adminInvoiceService.createInvoice(newInvoice).subscribe((response: any) => {
        this.router.navigate(['/admin-invoice']);
      })
    }
  }

}
