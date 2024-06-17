import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand, BrandFormValues } from 'src/app/shared/models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.baseUrl}brands`);
  }

  getBrand(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.baseUrl}brands/${id}`);
  }

  createBrand(brand: BrandFormValues): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}brands`, brand);
  }

  updateBrand(id: number, brand: BrandFormValues): Observable<Brand> {
    return this.http.put<Brand>(`${this.baseUrl}brands/${id}`, brand);
  }

  deleteBrand(id: number): Observable<Brand> {
    return this.http.delete<Brand>(`${this.baseUrl}brands/${id}`);
  }
}
