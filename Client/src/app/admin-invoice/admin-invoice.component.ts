import { Component, OnInit } from '@angular/core';
import { Invoice } from '../shared/models/invoice';
import { InvoiceParams } from '../shared/models/invoiceParams';
import { InvoiceService } from '../invoice/invoice.service';
import { AdminInvoiceService } from './admin-invoice.service';
import { User } from '../shared/models/user';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-admin-invoice',
  templateUrl: './admin-invoice.component.html',
  styleUrl: './admin-invoice.component.scss'
})
export class AdminInvoiceComponent implements OnInit {

  invoices!: Invoice[];
  totalCount!: number;
  invoiceParams!: InvoiceParams;
  currentUser$!: Observable<User | null>;
  isAdmin$!: Observable<boolean>;
  
  constructor(private invoiceService: InvoiceService,
    private adminInvoiceService: AdminInvoiceService, 
    public accountService: AccountService) {
    this.invoiceParams = this.invoiceService.getInvoiceParams();
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;

    this.getInvoice();
  }

  getInvoice() {
    this.invoiceService.getInvoices(this.invoiceParams).subscribe({
      next: response => {
        this.invoices = response.data;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  onPageChanged(event: any) {
    const params = this.invoiceService.getInvoiceParams();
    if (params.pageNumber !== event) {
      params.pageNumber !== event;
      this.invoiceService.setInvoiceParams(params);
      this.getInvoice();
    }
  }

  deleteInvoice(id: number) {
    this.adminInvoiceService.deleteInvoice(id).subscribe(() => {
      this.invoices = this.invoices.filter(p => p.id !== id);
      this.totalCount--;
    });
  }
}
