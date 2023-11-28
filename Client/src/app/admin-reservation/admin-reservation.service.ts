import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationFormValues } from '../shared/models/reservation';

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
    return this.http.put(this.baseUrl + 'reservations/' + id, reservation);
  }

  deleteReservation(id: number) {
    return this.http.delete(this.baseUrl + 'reservations/' + id);
  }
}
