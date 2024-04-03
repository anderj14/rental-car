import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/shared/models/reservation';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export default class ReservationDetailsComponent implements OnInit {
  reservation!: Reservation;

  constructor(private reservationService: ReservationService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getReservation();
  }

  getReservation() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if(id) this.reservationService.getReservation(+id).subscribe({
      next: reservation => this.reservation = reservation,
      error: error => console.log(error)
    });
  }
}
