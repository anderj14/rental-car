import { Component, OnInit } from '@angular/core';
import { Reservation } from '../shared/models/reservation';
import { ReservationParams } from '../shared/models/reservationParams';
import { ReservationService } from '../reservation/reservation.service';
import { AdminReservationService } from './admin-reservation.service';
import { forkJoin, map } from 'rxjs';

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

  // getReservation() {
  //   this.reservationService.getReservations(this.reservationParams).subscribe({
  //     next: response => {
  //       this.reservations = response.data;
  //       this.totalCount = response.count;
  //     },
  //     error: error => console.log(error)
  //   });
  // }

  getReservation() {
    this.reservationService.getReservations(this.reservationParams)
      .subscribe(response => {
        this.reservations = response.data;
        this.reservationParams.pageNumber = response.pageIndex;
        this.reservationParams.pageSize = response.pageSize;
        this.totalCount = response.count;
  
        const observables = this.reservations.map(reservation => {
          const customer$ = this.reservationService.getCustomerById(reservation.customerId);
          const vehicle$ = this.reservationService.getVehicleById(reservation.vehicleId);
          const insurance$ = this.reservationService.getInsuranceById(reservation.insuranceId);
  
          return forkJoin([customer$, vehicle$, insurance$]).pipe(
            map(([customer, vehicle, insurance]) => {
              reservation.customer = customer;
              reservation.vehicle = vehicle;
              reservation.insurance = insurance;
            })
          );
        });
  
        forkJoin(observables).subscribe(() => {
          // Todas las llamadas han terminado, ahora las reservas están actualizadas con la información adicional.
        });
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
    this.adminReservationService.deleteReservation(id).subscribe((response: any) => {
      this.reservations.splice(this.reservations.findIndex(p => p.id === id), 1);
      this.totalCount--;
    });
  }

}
