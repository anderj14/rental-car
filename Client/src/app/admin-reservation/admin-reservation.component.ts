import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Reservation } from '../shared/models/reservation';
import { ReservationParams } from '../shared/models/reservationParams';
import { AdminReservationService } from './admin-reservation.service';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { AccountService } from '../account/account.service';
import { ReservationService } from '../reservation-info/reservation.service';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.scss']
})
export class AdminReservationComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;

  reservations!: Reservation[];
  totalCount!: number;
  reservationParams!: ReservationParams;
  currentUser$!: Observable<User | null>;
  isAdmin$!: Observable<boolean>;

  sortOption = [
    { name: 'Reservation Number', value: 'reservationNumber' },
    { name: 'Date: Asc To Desc', value: 'dateAsc' },
    { name: 'Date: Desc To Asc', value: 'dateDesc' },
  ];



  constructor(private reservationService: ReservationService,
    private adminReservationService: AdminReservationService,
    public accountService: AccountService) {
    this.reservationParams = this.reservationService.getReservationParams();
  }
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;

    this.getReservation();
  }

  getReservation() {
    this.reservationService.getReservations(this.reservationParams).subscribe({
      next: response => {
        this.reservations = response.data;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    });
  }

  onPageChanged(event: any) {
    const params = this.reservationService.getReservationParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.reservationService.setReservationParams(params);
      this.getReservation();
    }
  }

  deleteReservation(id: number) {
    this.adminReservationService.deleteReservation(id).subscribe(
      () => {
        this.reservations = this.reservations.filter(p => p.id !== id);
        this.totalCount--;
      }
    );
  }

  onSearch() {
    this.reservationParams.search = this.searchTerm?.nativeElement.value;
    this.reservationParams.pageNumber = 1;
    this.getReservation();
  }

  onSortSelected(event: any) {
    this.reservationParams.sort = event.target.value;
    this.getReservation();
  }

}
