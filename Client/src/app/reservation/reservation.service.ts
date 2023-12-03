import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationParams } from '../shared/models/reservationParams';
import { Reservation } from '../shared/models/reservation';
import { Pagination } from '../shared/models/Pagination';
import { Observable } from 'rxjs';
import { Customer } from '../shared/models/customers';
import { Insurance } from '../shared/models/insurance';
import { Vehicle } from '../shared/models/vehicles';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  baseUrl = 'https://localhost:5001/api/';
  reservationParams = new ReservationParams();

  constructor(private http: HttpClient) { }

  getReservations(reservationParams: ReservationParams): Observable<Pagination<Reservation[]>> {
    let params = new HttpParams();
    
    if(reservationParams.customerId> 0) params = params.append('customerId', reservationParams.customerId);
    if(reservationParams.vehicleId) params = params.append('vehicleId', reservationParams.vehicleId);
    if(reservationParams.insuranceId) params = params.append('insuranceId', reservationParams.insuranceId);
    params = params.append('sort', reservationParams.sort);
    params = params.append('pageIndex', reservationParams.pageNumber);
    params = params.append('pageSize', reservationParams.pageSize);
    if (reservationParams.search) params = params.append('search', reservationParams.search);

    return this.http.get<Pagination<Reservation[]>>(this.baseUrl + 'reservations', { params });
  }

  setReservationParams(params: ReservationParams) {
    this.reservationParams = params;
  }

  getReservationParams() {
    return this.reservationParams;
  }


  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(this.baseUrl + 'reservations/' + id);
  }

  getCustomers() {
    return this.http.get<Customer[]>(this.baseUrl + 'customers');
  }
  getVehicles() {
    return this.http.get<Vehicle[]>(this.baseUrl + 'vehicles');
  }
  getInsurances(){
    return this.http.get<Insurance[]>(this.baseUrl + 'insurances');
  }
}
