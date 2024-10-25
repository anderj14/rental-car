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

  getReservationsByVehicleId(vehicleId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`/api/reservations?vehicleId=${vehicleId}`);
  }
  
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
  
  getVehicles(pageSize: number = 10000, statusId: number = 3): Observable<IVehicle[]> {
    return this.http.get<any>(`${this.baseUrl}Vehicles?PageSize=${pageSize}&StatusId=${statusId}`)
      .pipe(map(response => {
        if (Array.isArray(response)) {
          return response;
        } else if ('data' in response) {
          return response.data;
        } else {
          throw new Error('Invalid response format');
        }
      }));
  }
}
