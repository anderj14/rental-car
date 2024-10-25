import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Pagination } from 'src/app/shared/models/Pagination';
import { Insurance } from 'src/app/shared/models/insurance';
import { Reservation, ReservationFormValues } from 'src/app/shared/models/reservation';
import { IVehicle } from 'src/app/shared/models/vehicles';
import { ReservationService } from 'src/app/vehicle/reservation-info-form/reservation.service';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {

  reservation!: Reservation;
  reservationFormValues!: ReservationFormValues;

  vehicles: IVehicle[] = [];
  insurances: Insurance[] = [];

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute) {
    this.reservationFormValues = new ReservationFormValues();
  }

  ngOnInit(): void {
    const vehicles = this.getVehicles(800, 3); // Llama al servicio con el statusId 3 para vehículos disponibles
    const insurance = this.getInsurance();

    forkJoin([vehicles, insurance]).subscribe(results => {
      this.vehicles = this.extractData(results[0]);
      this.insurances = Array.isArray(results[1]) ? results[1] : [];

      console.log('Vehicles:', results[0]);
      console.log('Insurances:', results[1]);

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

      const vehicleId = this.vehicles && this.vehicles.find(x => x.vehicleName === response.vehicle)?.id;
      const insuranceId = this.insurances && this.insurances.find(x => x.insuranceName === response.insurance)?.id;
      this.reservation = response;
      this.reservationFormValues = { ...response, vehicleId, insuranceId };
    });
  }

  getInsurance() {
    return this.reservationService.getInsurances();
  }

  getVehicles(pageSize: number = 10000, statusId: number = 3) {
    return this.reservationService.getVehicles(pageSize, statusId); // Pasa el statusId 3 para vehículos disponibles
  }

  getCustomers() {
    return this.reservationService.getCustomers();
  }
}