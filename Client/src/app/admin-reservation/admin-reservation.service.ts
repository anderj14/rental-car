import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationFormValues } from '../shared/models/reservation';
import { Customer } from '../shared/models/customers';
import { Vehicle } from '../shared/models/vehicles';
import { Insurance } from '../shared/models/insurance';

@Injectable({
  providedIn: 'root'
})
export class AdminReservationService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  createReservation(reservation: ReservationFormValues) {
    return this.http.post(this.baseUrl + 'reservations', reservation);
  }

  updateReservation(reservation: ReservationFormValues, id: number) {
    // Extraer solo los datos necesarios del formulario
    const { startDate, endDate, days, rentalCost, customerId, vehicleId, insuranceId } = reservation;
    const updatedReservation = { startDate, endDate, days, rentalCost, customerId, vehicleId, insuranceId };

    return this.http.put(this.baseUrl + 'reservations/' + id, updatedReservation);
  }


  deleteReservation(id: number) {
    return this.http.delete(this.baseUrl + 'reservations/' + id);
  }
}
