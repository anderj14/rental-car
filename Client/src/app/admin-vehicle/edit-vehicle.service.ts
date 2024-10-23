import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVehicle, VehicleFormValues } from '../shared/models/vehicles';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditVehicleService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createVehicle(vehicle: VehicleFormValues) {
    return this.http.post(this.baseUrl + 'vehicles', vehicle);
  }

  updateVehicle(vehicle: VehicleFormValues, id: number) {
    return this.http.put(this.baseUrl + 'vehicles/' + id, vehicle);
  }

  deleteVehicle(id: number) {
    return this.http.delete(this.baseUrl + 'vehicles/' + id);
  }

  uploadImage(file: File, id: number) {
    const formData = new FormData();
    formData.append('photo', file, 'image.png');
    return this.http.put(this.baseUrl + 'vehicles/' + id + '/photo', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  deleteVehiclePhoto(photoId: number, vehicleId: number) {
    return this.http.delete(
      this.baseUrl + 'vehicles/' + vehicleId + '/photo/' + photoId
    );
  }

  setMainPhoto(photoId: number, vehicleId: number): Observable<IVehicle> {
    return this.http.post<IVehicle>(
      this.baseUrl + 'vehicles/' + vehicleId + '/photo/' + photoId,
      {}
    );
  }
}
