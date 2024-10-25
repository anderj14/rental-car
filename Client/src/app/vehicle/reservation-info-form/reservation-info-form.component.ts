import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminReservationService } from 'src/app/admin-reservation/admin-reservation.service';
import { Customer } from 'src/app/shared/models/customers';
import { Insurance } from 'src/app/shared/models/insurance';
import { ReservationFormValues } from 'src/app/shared/models/reservation';
import { IVehicle } from 'src/app/shared/models/vehicles';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InsuranceService } from 'src/app/vehicle-management/insurance/insurance.service';

@Component({
  selector: 'app-reservation-info-form',
  templateUrl: './reservation-info-form.component.html',
  styleUrls: ['./reservation-info-form.component.scss'],
})
export class ReservationInfoFormComponent implements OnInit {
  @Input() reservation!: ReservationFormValues;
  @Input() vehicles!: IVehicle;
  @Input() insurances!: Insurance[];

  customerControl = new FormControl();
  filteredCustomers!: Observable<Customer[]>;
  reservedDates: Date[] = [];

  constructor(
    private insuranceService: InsuranceService,
    private adminReservationService: AdminReservationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { vehicle: IVehicle },
    private diaglogRef: MatDialogRef<ReservationInfoFormComponent>
  ) {
    this.reservation = new ReservationFormValues();
    this.vehicles = data.vehicle; 
  }

  ngOnInit(): void {
    this.loadInsurances();
  }

  loadInsurances() {
    this.insuranceService.getInsurances().subscribe(
      (insurances: Insurance[]) => {
        this.insurances = insurances;
      },
      (error: any) => {
        console.error('Error al cargar los seguros:', error);
      }
    );
  }

  onSubmit(reservationFormValues: ReservationFormValues): void {
    const reservationData = {
      ...reservationFormValues,
      vehicleId: this.vehicles.id,
      vehicle: this.vehicles
    };
    console.log('Sending reservation data:', reservationData);

    this.adminReservationService.createReservation(reservationData).subscribe(
      (response: any) => {
        const newReservationId = response.id;
        console.log(response);
        this.router.navigate(['/reservation-info', newReservationId]);
        this.diaglogRef.close(response)
      },
      (error: any) => {
        console.error('Error al crear reserva:', error);
      }
    );
  }
}
