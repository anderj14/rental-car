import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminReservationService } from '../admin-reservation/admin-reservation.service';
import { Insurance } from '../shared/models/insurance';
import { Reservation, ReservationFormValues } from '../shared/models/reservation';
import { forkJoin } from 'rxjs';
import { ReservationService } from '../reservation/reservation.service';
import { Pagination } from '../shared/models/Pagination';
import { Customer } from '../shared/models/customers';
import { IVehicle } from '../shared/models/vehicles';

@Component({
  selector: 'app-reservation-info',

  templateUrl: './reservation-info.component.html',
  styleUrl: './reservation-info.component.scss'
})
export class ReservationInfoComponent implements OnInit {

  reservation!: Reservation;
  reservationFormValues!: ReservationFormValues;

  customers: Customer[] = [];
  vehicles: IVehicle[] = [];
  insurances: Insurance[] = [];

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute) {
    this.reservationFormValues = new ReservationFormValues();
  }

  ngOnInit(): void {
    const customers = this.getCustomers();
    const vehicles = this.getVehicles();
    const insurance = this.getInsurance();

    forkJoin([customers, vehicles, insurance]).subscribe(results => {
      this.customers = this.extractData(results[0]);
      this.vehicles = this.extractData(results[1]);
      this.insurances = Array.isArray(results[2]) ? results[2] : [];

      console.log('Customers:', results[0]);
      console.log('Vehicles:', results[1]);
      console.log('Insurances:', results[2]);

    }, error => {
      console.log(error);
    }, () => {
      if (this.route.snapshot.url[0].path === 'edit') {
        this.loadVehicle();
      }
    });

  }

  private extractData<T>(response: Pagination<T> | T[]): T[] {
    if ('data' in response) {
      return Array.isArray(response.data) ? response.data : [];
    } else {
      return Array.isArray(response) ? response : [];
    }
  }


  updatePrice(event: any) {
    this.reservation.rentalCost = event;
  }

  loadVehicle() {
    const id = this.route.snapshot.paramMap.get('id');
    this.reservationService.getReservation(+id!).subscribe((response: any) => {

      const customerId = this.customers && this.customers.find(x => x.customerName === response.customer)?.id;
      const vehicleId = this.vehicles && this.vehicles.find(x => x.vehicleName === response.vehicle)?.id;
      const insuranceId = this.insurances && this.insurances.find(x => x.insuranceName === response.insurance)?.id;
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