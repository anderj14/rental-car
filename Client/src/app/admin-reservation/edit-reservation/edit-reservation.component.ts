import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ReservationService } from 'src/app/reservation/reservation.service';
import { Customer } from 'src/app/shared/models/customers';
import { Insurance } from 'src/app/shared/models/insurance';
import { Reservation, ReservationFormValues } from 'src/app/shared/models/reservation';
import { Vehicle } from 'src/app/shared/models/vehicles';
import { AdminReservationService } from '../admin-reservation.service';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {

  reservation: Reservation | null = null;
  reservationFormValues!: ReservationFormValues;
  customers!: Customer[];
  vehicles!: Vehicle[];
  insurances!: Insurance[];

  constructor(
    private reservationService: ReservationService,
    private adminReservationService: AdminReservationService,
    private route: ActivatedRoute
  ) {
    this.reservation = {} as Reservation;  // Inicializa el objeto reservation
    this.reservationFormValues = new ReservationFormValues();
  }

  ngOnInit(): void {
    forkJoin([this.getCustomers(), this.getVehicles(), this.getInsurance()]).subscribe(
      results => {
        this.customers = Array.isArray(results[0]) ? results[0] : [];
        this.vehicles = Array.isArray(results[1]) ? results[1] : [];
        this.insurances = Array.isArray(results[2]) ? results[2] : [];

        console.log('Customers:', this.customers);
        console.log('Vehicles:', this.vehicles);
        console.log('Insurances:', this.insurances);

        if (this.route.snapshot.url[0].path === 'edit-reservation') {
          this.loadReservation();
        }
      },
      error => {
        console.log(error);
      }
    );
  }



  updatePrice(event: any) {
    this.reservation!.rentalCost = event;
  }
  loadReservation() {
    const id = this.route.snapshot.paramMap.get('id');
    this.reservationService.getReservation(+id!).subscribe((response: any) => {
      const customerId = this.customers && this.customers.find(x => x.customerName === response.customer)?.id;
      const vehicleId = this.vehicles && this.vehicles.find(x => x.vehicleName === response.vehicle)?.id;
      const insuranceId = this.insurances && this.insurances.find(x => x.insuranceName === response.insurance)?.id;

      if (this.reservation === null) {
        this.reservation = response;
      }

      this.reservationFormValues = { ...response, customerId, vehicleId, insuranceId };
    });
  }



  getInsurance() {
    return this.reservationService.getInsurances();
  }
  getVehicles() {
    return this.reservationService.getVehicles();
  }
  getCustomers() {
    return this.reservationService.getCustomers();
  }

}
