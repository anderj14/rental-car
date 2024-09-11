import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status, StatusFormValues } from 'src/app/shared/models/status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseUrl}statuses`);
  }

  getStatus(id: number): Observable<Status> {
    return this.http.get<Status>(`${this.baseUrl}statuses/${id}`);
  }

  createStatus(status: StatusFormValues): Observable<Status> {
    return this.http.post<Status>(`${this.baseUrl}statuses`, status);
  }

  updateStatus(id: number, status: StatusFormValues): Observable<Status> {
    return this.http.put<Status>(`${this.baseUrl}statuses/${id}`, status);
  }

  deleteStatus(id: number): Observable<Status> {
    return this.http.delete<Status>(`${this.baseUrl}statuses/${id}`);
  }
}
