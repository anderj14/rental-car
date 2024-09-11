import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleType, VehicleTypeFormValues } from 'src/app/shared/models/vehicleType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getVehicleTypes(): Observable<VehicleType[]> {
    return this.http.get<VehicleType[]>(`${this.baseUrl}vehiclesType`);
  }

  getVehicleType(id: number): Observable<VehicleType> {
    return this.http.get<VehicleType>(`${this.baseUrl}vehiclesType/${id}`);
  }

  createVehicleType(vehicleType: VehicleTypeFormValues): Observable<VehicleType> {
    return this.http.post<VehicleType>(`${this.baseUrl}vehiclesType`, vehicleType);
  }

  updateVehicleType(id: number, vehicleType: VehicleTypeFormValues): Observable<VehicleType> {
    return this.http.put<VehicleType>(`${this.baseUrl}vehiclesType/${id}`, vehicleType);
  }

  deleteVehicleType(id: number): Observable<VehicleType> {
    return this.http.delete<VehicleType>(`${this.baseUrl}vehiclesType/${id}`);
  }
}
