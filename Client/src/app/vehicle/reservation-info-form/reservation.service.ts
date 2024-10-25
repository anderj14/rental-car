import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Customer } from "src/app/shared/models/customers";
import { Insurance } from "src/app/shared/models/insurance";
import { Pagination } from "src/app/shared/models/Pagination";
import { Reservation } from "src/app/shared/models/reservation";
import { ReservationParams } from "src/app/shared/models/reservationParams";
import { IVehicle } from "src/app/shared/models/vehicles";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  baseUrl = environment.apiUrl;
  
  reservationParams = new ReservationParams();

  constructor(private http: HttpClient) { }

  getReservations(reservationParams: ReservationParams): Observable<Pagination<Reservation[]>> {
    let params = new HttpParams();

    if (reservationParams.customerId > 0) params = params.append('customerId', reservationParams.customerId);
    if (reservationParams.vehicleId) params = params.append('vehicleId', reservationParams.vehicleId);
    if (reservationParams.insuranceId) params = params.append('insuranceId', reservationParams.insuranceId);
    if (reservationParams.status) params = params.append('status', reservationParams.status);
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
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Reservation>(this.baseUrl + 'reservations/' + id + '/user', {headers});
  }

  getCustomers() {
    return this.http.get<Customer[]>(this.baseUrl + 'customers');
  }
  getCustomer(id: number) {
    return this.http.get<Customer[]>(this.baseUrl + 'customers' + id);
  }

  getVehicles(pageSize: number = 10000, statusId: number = 3): Observable<IVehicle[]> {
    return this.http.get<Pagination<IVehicle[]>>(`${this.baseUrl}Vehicles?PageSize=${pageSize}&StatusId=${statusId}`)
      .pipe(map(response => response.data));
  }

  getVehicle(id: number) {
    return this.http.get<IVehicle[]>(this.baseUrl + 'vehicles' + id);
  }
  getInsurances() {
    return this.http.get<Insurance[]>(this.baseUrl + 'insurances');
  }
}
