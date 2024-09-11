import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fuel, FuelFormValues } from 'src/app/shared/models/fuel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuelService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFuels(): Observable<Fuel[]> {
    return this.http.get<Fuel[]>(`${this.baseUrl}fuels`);
  }

  getFuel(id: number): Observable<Fuel> {
    return this.http.get<Fuel>(`${this.baseUrl}/${id}`);
  }

  createFuel(fuel: FuelFormValues): Observable<Fuel> {
    return this.http.post<Fuel>(`${this.baseUrl}fuels`, fuel);
  }

  updateFuel(id: number, fuel: FuelFormValues): Observable<Fuel> {
    return this.http.put<Fuel>(`${this.baseUrl}fuels/${id}`, fuel);
  }

  deleteFuel(id: number): Observable<Fuel> {
    return this.http.delete<Fuel>(`${this.baseUrl}fuels/${id}`);
  }
}
