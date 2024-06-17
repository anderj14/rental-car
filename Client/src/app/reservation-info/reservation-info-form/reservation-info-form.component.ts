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

  calculateRentalCost(): void {
    if (this.reservation.vehicleId && this.reservation.insuranceId && this.reservation.days) {
      const selectedVehicle = this.vehicles.find(v => v.id === this.reservation.vehicleId);
      const selectedInsurance = this.insurances.find(i => i.id === this.reservation.insuranceId);

      if (selectedVehicle && selectedInsurance) {
        const vehicleRentalPrice = selectedVehicle.rentalPrice;
        const insurancePrice = selectedInsurance.insurancePrice;
        const totalDays = this.reservation.days;

        const rentalCost = (vehicleRentalPrice + insurancePrice) * totalDays;

        console.log('Rental Cost:', rentalCost);

        this.reservation.rentalCost = rentalCost;
        console.log('Reservation:', this.reservation);
      }
    }
  }

  calculateDays(): void {
    if (this.reservation.startDate && this.reservation.endDate) {
      const startDate = new Date(this.reservation.startDate);
      const endDate = new Date(this.reservation.endDate);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      this.reservation.days = differenceInDays;

      this.calculateRentalCost();
    }
  }

  validateReservation(reservation: ReservationFormValues): boolean {
    console.log('Validating reservation:', reservation);
    const isValid = (
      reservation.customerId > 0 &&
      reservation.days > 0 &&
      reservation.endDate !== '' &&
      reservation.insuranceId > 0 &&
      reservation.startDate !== '' &&
      reservation.vehicleId > 0 &&
      reservation.rentalCost > 0
    );
    if (!isValid) {
      console.error('Validation failed. Current reservation values:', reservation);
    }
    return isValid;
  }

  onSubmit(form: any): void {
    if (this.validateReservation(this.reservation)) {
      const newReservation = {
        ...this.reservation,
        rentalCost: parseFloat(this.reservation.rentalCost.toFixed(2)),
        customerId: this.reservation.customerId,
        vehicleId: this.reservation.vehicleId
      };

      console.log('Sending reservation data:', newReservation);

      this.adminReservationService.createReservation(newReservation).subscribe(
        (response: any) => {
          const newReservationId = response.id;
          console.log(response);
          this.router.navigate(['/admin-reservation', newReservationId]);
        },
        (error: any) => {
          console.error('Error al crear reserva:', error);
        }
      );
    } else {
      console.error('Validation failed. Required fields are missing.');
    }
  }
}
