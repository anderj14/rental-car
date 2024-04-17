import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminReservationService } from 'src/app/admin-reservation/admin-reservation.service';
import { Customer } from 'src/app/shared/models/customers';
import { Insurance } from 'src/app/shared/models/insurance';
import { ReservationFormValues } from 'src/app/shared/models/reservation';
import { IVehicle } from 'src/app/shared/models/vehicles';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-info-form',
  templateUrl: './reservation-info-form.component.html',
  styleUrls: ['./reservation-info-form.component.scss']
})
export class ReservationInfoFormComponent implements OnInit {

  @Input() reservation!: ReservationFormValues;
  @Input() customers!: Customer[];
  @Input() vehicles!: IVehicle[];
  @Input() insurances!: Insurance[];

  customerControl = new FormControl();
  filteredCustomers!: Observable<Customer[]>;

  constructor(
    private adminReservationService: AdminReservationService,
    private sessionStorage: SessionStorageService,
    private router: Router

  ) {
    this.reservation = new ReservationFormValues();
  }

  ngOnInit(): void {
    const vehicleId = this.sessionStorage.retrieve('vehicleid');
    const customerId = this.sessionStorage.retrieve('customerid');

    if (vehicleId && customerId) {
      this.reservation.vehicleId = +vehicleId;
      this.reservation.customerId = +customerId;
    }
  }

  updatePrice(event: any) {
    this.reservation.rentalCost = event;
  }

  onSubmit(reservation: ReservationFormValues) {
    const newReservation = { ...reservation, rentalCost: +reservation.rentalCost };
    this.adminReservationService.createReservation(newReservation).subscribe((response: any) => {
      const newReservationId = response.id;
      console.log(response);
      this.router.navigate(['/admin-reservation', newReservationId]);
    });
  }

  calculateDays() {
    if (this.reservation.startDate && this.reservation.endDate) {
      const startDate = new Date(this.reservation.startDate);
      const endDate = new Date(this.reservation.endDate);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      this.reservation.days = differenceInDays;
    }
  }

  getCustomerNameById(id: number): string {
    const customer = this.customers.find(c => c.id === id);
    return customer ? customer.customerName : '';
  }

  getVehicleNameById(id: number): string {
    const vehicle = this.vehicles.find(v => v.id === id);
    return vehicle ? vehicle.vehicleName : '';
  }
}
