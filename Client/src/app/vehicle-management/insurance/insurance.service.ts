import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Insurance, InsuranceFormValues } from 'src/app/shared/models/insurance';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getInsurances(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(`${this.baseUrl}insurances`);
  }

  createInsurance(insurance: InsuranceFormValues): Observable<Insurance> {
    return this.http.post<Insurance>(`${this.baseUrl}insurances`, insurance);
  }

  updateInsurance(id: number, insurance: InsuranceFormValues): Observable<Insurance> {
    return this.http.put<Insurance>(`${this.baseUrl}insurances/${id}`, insurance);
  }

  deleteInsurance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}insurances/${id}`);
  }
}
