import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { Customer } from 'src/app/shared/models/customers';
import { Reservation } from 'src/app/shared/models/reservation';
import { Invoice } from 'src/app/shared/models/invoice';
import { Vehicle } from 'src/app/shared/models/vehicles';
import { VehicleService } from 'src/app/vehicle/vehicle.service';
import { Insurance } from 'src/app/shared/models/insurance';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {

  invoice!: Invoice;

  constructor(private invoiceService: InvoiceService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getInvoice();
  }


  getInvoice() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceService.getInvoice(+id).subscribe({
        next: invoice => this.invoice = invoice,
        error: error => console.log(error)
      });
    }
  }
}
