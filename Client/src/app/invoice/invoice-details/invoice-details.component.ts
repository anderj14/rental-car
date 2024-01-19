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
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice</title>
            <style>
              body {
                font-family: 'montserrat', sans-serif;                
                margin: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              h2 {
                border-bottom: 1px solid #333;
                padding-bottom: 5px;
              }
              p {
                margin: 20px 0;
                font-size: 18px
              }
              strong {
                font-size: 18px
              }
              .content {
                width: 360px;
                padding: 50px;
                border: 1px solid #ddd;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                background-color: #fff;
                margin: 20px;
              }
              .body {
                display: flex;
                justify-content: space-between;

              }
              .total {
                display: flex;
                justify-content: space-between;
              }
            </style>
          </head>
          <body>
            <div class="content">
              <h2>Invoice Details</h2>
              <div class="body">
                <div class="info">
                  <p><strong>Date:</strong></p>
                  <p><strong>Reservation N.:</strong></p>
                  <p><strong>Customer Name:</strong></p>
                  <p><strong>Payment Type:</strong></p>
                </div>
                <div class="data">
                  <p> ${this.invoice.date}</p>
                  <p> ${this.invoice.reservation}</p>
                  <p> ${this.invoice.customer}</p>
                  <p> ${this.invoice.paymentType}</p>
                </div>
              </div>
              <hr/>
              <div class="total">
                <p><strong>Total Costs:</strong></p>
                <p>$${this.invoice.totalAmount}</p>
              </div>
            </div>
          </body>
        </html>
      `);
  
      printWindow.document.close();
      printWindow.print();
    }
  }
  
}
