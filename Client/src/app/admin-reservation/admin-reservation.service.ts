import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation, ReservationFormValues } from '../shared/models/reservation';
import { IVehicle } from '../shared/models/vehicles';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminReservationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createReservation(reservation: ReservationFormValues): Observable<Reservation> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Reservation>(this.baseUrl + 'reservations', reservation, {headers});
  }

  updateReservation(reservation: ReservationFormValues, id: number) {
    return this.http.put(this.baseUrl + 'reservations/' + id, reservation);
  }

  deleteReservation(id: number) {
    return this.http.delete(this.baseUrl + 'reservations/' + id, { responseType: 'text' });
  }
}
