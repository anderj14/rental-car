import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Reservation } from '../shared/models/reservation';
import { ReservationService } from './reservation.service';
import { ReservationParams } from '../shared/models/reservationParams';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { AccountService } from '../account/account.service';
import { Customer } from '../shared/models/customers';
import { Vehicle } from '../shared/models/vehicles';
import { Insurance } from '../shared/models/insurance';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;

  reservations!: Reservation[];
  customers!: Customer[];
  vehicle!: Vehicle[];
  insurance!: Insurance[];
  reservationParams = new ReservationParams();
  sortOption = [
    { name: 'Alphabetical', value: 'reservation' },
    { name: 'Price: Low To High', value: 'priceAsc' },
    { name: 'Price: High To Low', value: 'priceDesc' },
  ];
  totalCount = 0;
  currentUser$!: Observable<User | null>;
  isAdmin$!: Observable<boolean>;

  constructor(private reservationService: ReservationService, public accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;

    this.getReservations();
  }

  getReservations() {
    this.reservationService.getReservations(this.reservationParams).subscribe({
      next: response => {
        this.reservations = response.data;
        this.reservationParams.pageNumber = response.pageIndex;
        this.reservationParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  onSortSelected(event: any) {
    this.reservationParams.sort = event.target.value;
    this.getReservations();
  }

  onPageChanged(event: any) {
    if (this.reservationParams.pageNumber !== event) {
      this.reservationParams.pageNumber = event;
      this.getReservations();
    }
  }

  onSearch() {
    this.reservationParams.search = this.searchTerm?.nativeElement.value;
    this.reservationParams.pageNumber = 1;
    this.getReservations();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.reservationParams = new ReservationParams();
    this.getReservations();
  }

}
