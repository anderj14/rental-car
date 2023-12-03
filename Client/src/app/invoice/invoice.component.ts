import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Invoice } from '../shared/models/invoice';
import { InvoiceParams } from '../shared/models/invoiceParams';
import { InvoiceService } from './invoice.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { AccountService } from '../account/account.service';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;

  invoices!: Invoice[];
  invoiceParams = new InvoiceParams();
  sortOption = [
    { name: 'Alphabetical', value: 'invoice' },
    { name: 'Price: Low To High', value: 'priceAsc' },
    { name: 'Price: High To Low', value: 'priceDesc' },
  ];
  totalCount = 0;
  
  currentUser$!: Observable<User | null>;
  isAdmin$!: Observable<boolean>;

  constructor(
    private invoiceService: InvoiceService,
    public accountService: AccountService
  ) { }
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;

    this.getInvoices();
  }

  getInvoices() {
    this.invoiceService.getInvoices(this.invoiceParams).subscribe({
      next: response => {
        this.invoices = response.data;
        this.invoiceParams.pageNumber = response.pageIndex;
        this.invoiceParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    });
  }

  onSortSelected(event: any) {
    this.invoiceParams.sort = event.target.value;
    this.getInvoices();
  }

  onPageChanged(event: any) {
    if (this.invoiceParams.pageNumber !== event) {
      this.invoiceParams.pageNumber = event;
      this.getInvoices();
    }
  }

  onSearch() {
    this.invoiceParams.search = this.searchTerm?.nativeElement.value;
    this.invoiceParams.pageNumber = 1;
    this.getInvoices();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.invoiceParams = new InvoiceParams();
    this.getInvoices();
  }

}
