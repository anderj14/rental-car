import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { InvoiceService } from 'src/app/invoice/invoice.service';
import { Pagination } from 'src/app/shared/models/Pagination';
import { Customer } from 'src/app/shared/models/customers';
import { Invoice, InvoiceFormValues } from 'src/app/shared/models/invoice';
import { Reservation } from 'src/app/shared/models/reservation';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrl: './edit-invoice.component.scss'
})
export class EditInvoiceComponent implements OnInit {
  invoice!: Invoice;
  invoiceFormValues!: InvoiceFormValues;
  customers: Customer[] = [];
  reservations: Reservation[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute
  ) {
    this.invoiceFormValues = new InvoiceFormValues();
  }

  ngOnInit(): void {
    const customers = this.getCustomers();
    const reservations = this.getReservations();

    forkJoin([customers, reservations]).subscribe(results => {
      this.customers = this.extractData(results[0]);
      this.reservations = this.extractData(results[1]);
    }, error => {
      console.log(error);
    }, () => {
      if (this.route.snapshot.url[0].path == 'edit') {
        this.loadInvoice();
      }
    })
  }

  updatePrice(event: any) {
    this.invoice.totalAmount = event;
  }

  private extractData<T>(response: Pagination<T> | T[]): T[] {
    if ('data' in response) {
      return Array.isArray(response.data) ? response.data : [];
    } else {
      return Array.isArray(response) ? response : [];
    }
  }
  loadInvoice() {
    const id = this.route.snapshot.paramMap.get('id');
    this.invoiceService.getInvoice(+id!).subscribe((response: any) => {
      const customerId = this.customers && this.customers.find(x => x.customerName === response.customer)?.id;
      const reservationId = this.reservations && this.reservations.find(x => x.reservationNumber === response.reservation)?.id;

      this.invoice = response;
      this.invoiceFormValues = { ...response, customerId, reservationId };
    })
  }


  getReservations() {
    return this.invoiceService.getReservations();
  }
  getCustomers() {
    return this.invoiceService.getCustomers();
  }
}
