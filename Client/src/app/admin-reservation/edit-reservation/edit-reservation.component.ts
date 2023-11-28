import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ReservationService } from 'src/app/reservation/reservation.service';
import { Customer } from 'src/app/shared/models/customers';
import { Insurance } from 'src/app/shared/models/insurance';
import { Reservation, ReservationFormValues } from 'src/app/shared/models/reservation';
import { Vehicle } from 'src/app/shared/models/vehicles';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {

  reservation!: Reservation;
  reservationFormValues!: ReservationFormValues;
  customers!: Customer[];
  vehicles!: Vehicle[];
  insurances!: Insurance[];

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute) {
    this.reservationFormValues = new ReservationFormValues();
  }

  ngOnInit(): void {
    const customers = this.getCustomers();
    const vehicles = this.getVehicles();
    const insurance = this.getInsurance();

    forkJoin([customers, vehicles, insurance]).subscribe(results => {
      this.customers = results[0];
      this.vehicles = results[1];
      this.insurances = results[2];


    }, error => {
      console.log(error);
    }, () => {
      if (this.route.snapshot.url[0].path === 'edit-reservation') {
        this.loadVehicle();
      }
    });
  }

  updatePrice(event: any) {
    this.reservation.rentalCost = event;
  }

  loadVehicle() {
    const id = this.route.snapshot.paramMap.get('id');
    this.reservationService.getReservation(+id!).subscribe((response: any) => {

      const customerId = this.customers && this.customers.find(x => x.customerName === response.customers)?.id;
      const vehicleId = this.vehicles && this.customers.find(x => x.customerName === response.vehicles)?.id;
      const insuranceId = this.insurances && this.insurances.find(x => x.insuranceName === response.insurances)?.id;
      this.reservation = response;
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
