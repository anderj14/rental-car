import { Component, OnInit } from '@angular/core';
import { IVehicle } from '../shared/models/vehicles';
import { VehicleParams } from '../shared/models/vehicleParams';
import { Customer } from '../shared/models/customers';
import { CustomerParams } from '../shared/models/customerParams';
import { Reservation } from '../shared/models/reservation';
import { ReservationParams } from '../shared/models/reservationParams';
import { VehicleService } from '../vehicle/vehicle.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservationService } from '../reservation-info/reservation.service';
import { AccountService } from '../account/account.service';
import { UserParams } from '../shared/models/userParams';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  vehicles!: IVehicle[];
  vehicleParams = new VehicleParams();
  reservations!: Reservation[];
  reservationParams = new ReservationParams();
  userParams = new UserParams();

  totalCountVehicle = 0;
  totalCountUser = 0;
  totalCountReservation = 0;

  constructor(
    private vehicleService: VehicleService,
    private reservationService: ReservationService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getRentedVehicles();
    this.getReservations();
    this.getTotalVehicles();
    this.getTotalReservations();
    this.getTotalUsers();
  }

  getRentedVehicles() {
    this.vehicleParams.status = 'reserved';
    this.vehicleService.getVehicles(this.vehicleParams).subscribe({
      next: (response) => {
        this.vehicles = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  getReservations() {
    this.reservationParams.status = 'Pending';
    this.reservationService.getReservations(this.reservationParams).subscribe({
      next: (response) => {
        this.reservations = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  getTotalVehicles() {
    const vehicleParamsNoFilter = new VehicleParams();
    this.vehicleService.getVehicles(vehicleParamsNoFilter).subscribe({
      next: (response) => {
        this.totalCountVehicle = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  getTotalReservations() {
    const reservationParamsNoFilter = new ReservationParams();
    this.reservationService
      .getReservations(reservationParamsNoFilter)
      .subscribe({
        next: (response) => {
          this.totalCountReservation = response.count;
        },
        error: (error) => console.log(error),
      });
  }

  getTotalUsers() {
    const userParamsNoFilter = new UserParams();
    this.accountService.getUsers(userParamsNoFilter).subscribe({
      next: (response) => {
        this.totalCountUser = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  getTotalCountVehicle(): number {
    return this.totalCountVehicle;
  }

  getTotalCountCustomer(): number {
    return this.totalCountUser;
  }

  getTotalCountReservation(): number {
    return this.totalCountReservation;
  }
}
