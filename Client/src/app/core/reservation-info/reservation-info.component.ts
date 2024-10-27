import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { Reservation } from 'src/app/shared/models/reservation';
import { ReservationService } from 'src/app/vehicle/reservation-info-form/reservation.service';

@Component({
  selector: 'app-reservation-info',
  templateUrl: './reservation-info.component.html',
  styleUrl: './reservation-info.component.scss',
})

export class ReservationInfoComponent implements OnInit {
  reservation!: Reservation;

  constructor(
    private reservationService: ReservationService,
    private activateRoute: ActivatedRoute,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id)
      this.reservationService.getReservationByUser(+id).subscribe({
        next: (response) => {
          this.reservation = response;
        },
        error: error => console.log(error)
      });
  }
}
