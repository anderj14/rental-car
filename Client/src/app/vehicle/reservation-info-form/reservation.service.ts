import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pagination } from "src/app/shared/models/Pagination";
import { Reservation } from "src/app/shared/models/reservation";
import { ReservationParams } from "src/app/shared/models/reservationParams";
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

    params = params.append('sort', reservationParams.sort);
    params = params.append('pageIndex', reservationParams.pageNumber);
    params = params.append('pageSize', reservationParams.pageSize);
    if (reservationParams.search) params = params.append('search', reservationParams.search);

    return this.http.get<Pagination<Reservation[]>>(this.baseUrl + 'reservations', { params });
  }

  getReservationsByUser(reservationParams: ReservationParams): Observable<Pagination<Reservation[]>> {
    let params = new HttpParams();

    params = params.append('sort', reservationParams.sort);
    params = params.append('pageIndex', reservationParams.pageNumber);
    params = params.append('pageSize', reservationParams.pageSize);
    if (reservationParams.search) params = params.append('search', reservationParams.search);

    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const options = { params, headers };

    return this.http.get<Pagination<Reservation[]>>(this.baseUrl + 'reservations/byuser', options);
  }

  setReservationParams(params: ReservationParams) {
    this.reservationParams = params;
  }

  getReservationParams() {
    return this.reservationParams;
  }

  getReservationByUser(id: number): Observable<Reservation> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Reservation>(this.baseUrl + 'reservations/' + id + '/user', {headers});
  }

  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(this.baseUrl + 'reservations/' + id);
  }
}
