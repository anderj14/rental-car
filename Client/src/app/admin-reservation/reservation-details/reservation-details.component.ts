import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/shared/models/reservation';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ReservationService } from 'src/app/vehicle/reservation-info-form/reservation.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export default class ReservationDetailsComponent implements OnInit {
  reservation!: Reservation;

  constructor(
    private reservationService: ReservationService,
    private activateRoute: ActivatedRoute,
    public accountService: AccountService,
    private bcService: BreadcrumbService,
  ) { }

  ngOnInit(): void {
    this.getReservation();
  }

  getReservation() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) this.reservationService.getReservation(+id).subscribe({
      next: response => {
        this.reservation = response;
        this.bcService.set('@reservationDetails', response.reservationNumber + " | " + response.appUserId);
      },
      error: error => console.log(error)
    });
  }
}
