import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { Invoice } from 'src/app/shared/models/invoice';

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

  printInvoice() {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Invoice</title></head><body>');
      printWindow.document.write('<h2>Invoice Details</h2>');
      
      // Aquí puedes agregar el contenido específico que deseas imprimir
      printWindow.document.write('<p>Date: ' + (this.invoice.date) + '</p>');
      printWindow.document.write('<p>Reservation N.: ' + this.invoice.reservation + '</p>');
      printWindow.document.write('<p>Customer Name: ' + this.invoice.customer + '</p>');
      printWindow.document.write('<p>Payment Type: ' + this.invoice.paymentType + '</p>');
      printWindow.document.write('<p>Total Costs: $' + (this.invoice.totalAmount) + '</p>');

      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }
}
