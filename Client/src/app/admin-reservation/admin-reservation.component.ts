import { Component, OnInit } from '@angular/core';
import { Reservation } from '../shared/models/reservation';
import { ReservationParams } from '../shared/models/reservationParams';
import { ReservationService } from '../reservation/reservation.service';
import { AdminReservationService } from './admin-reservation.service';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.scss']
})
export class AdminReservationComponent implements OnInit{

  reservations!: Reservation[];
  totalCount!: number;
  reservationParams!: ReservationParams;

  constructor(private reservationService: ReservationService, private adminReservationService: AdminReservationService) {
    this.reservationParams = this.reservationService.getReservationParams();
  }
  ngOnInit(): void {
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

  deleteVehicle(id: number) {
    this.adminReservationService.deleteReservation(id).subscribe((response: any) => {
      this.reservations.splice(this.reservations.findIndex(p => p.id === id), 1);
      this.totalCount--;
    });
  }

}
