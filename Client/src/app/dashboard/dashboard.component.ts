import { Component, OnInit } from '@angular/core';
import { IVehicle } from '../shared/models/vehicles';
import { VehicleParams } from '../shared/models/vehicleParams';
import { Customer } from '../shared/models/customers';
import { CustomerService } from '../customer/customer.service';
import { ReservationService } from '../reservation/reservation.service';
import { CustomerParams } from '../shared/models/customerParams';
import { Reservation } from '../shared/models/reservation';
import { ReservationParams } from '../shared/models/reservationParams';
import { VehicleService } from '../vehicle/vehicle.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  vehicles!: IVehicle[];
  vehicleParams = new VehicleParams();
  customers!: Customer[];
  customerParams = new CustomerParams();
  reservations!: Reservation[];
  reservationParams = new ReservationParams();

  totalCountVehicle = 0;
  totalCountCustomer = 0;
  totalCountReservation = 0;
  totalCount!: number;

  constructor(
    private vehicleService: VehicleService,
    private reservationService: ReservationService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.getVehicles();
    this.getCustomers();
    this.getReservations();
    this.getRentedVehicles(); // Load rented vehicles initially

  }

  getRentedVehicles() {
    this.vehicleParams.statusId = 2; // Set statusId to filter rented vehicles
    this.vehicleService.getVehicles(this.vehicleParams).subscribe({
      next: response => {
        this.vehicles = response.data;
        this.totalCount = response.count;
        console.log(this.totalCount);
        console.log(this.vehicles);
        
        
      },
      error: error => console.log(error)
    });
  }


  getTotalCountVehicle(): number {
    return this.totalCountVehicle;
  }

  getTotalCountCustomer(): number {
    return this.totalCountCustomer;
  }

  getTotalCountReservation(): number {
    return this.totalCountReservation;
  }

  getVehicles() {
    this.vehicleService.getVehicles(this.vehicleParams).subscribe({
      next: response => {
        this.vehicles = response.data;
        this.vehicleParams.pageNumber = response.pageIndex;
        this.vehicleParams.pageSize = response.pageSize;
        this.totalCountVehicle = response.count;
      },
      error: error => console.log(error)
    });
  }

  getCustomers() {
    this.customerService.getCustomers(this.customerParams).subscribe({
      next: response => {
        this.customers = response.data;
        this.customerParams.pageNumber = response.pageIndex;
        this.customerParams.pageSize = response.pageSize;
        this.totalCountCustomer = response.count;
      },
      error: error => console.log(error)
    });
  }

  getReservations() {
    this.reservationService.getReservations(this.reservationParams).subscribe({
      next: response => {
        this.reservations = response.data;
        this.reservationParams.pageNumber = response.pageIndex;
        this.reservationParams.pageSize = response.pageSize;
        this.totalCountReservation = response.count;
      },
      error: error => console.log(error)
    })
  }


}
