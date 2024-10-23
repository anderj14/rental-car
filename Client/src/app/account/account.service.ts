import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, of, switchMap } from 'rxjs';
import { Address, AddressFormValues, User, UserProfileFormValues } from '../shared/models/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserParams } from '../shared/models/userParams';
import { Pagination } from '../shared/models/Pagination';
import { UserProfile } from '../shared/models/userProfile';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  userParams = new UserParams();

  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  private isAdminSource = new ReplaySubject<boolean>(1);
  isAdmin$ = this.isAdminSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(userParams: UserParams) {
    let params = new HttpParams();

    params = params.append('sort', userParams.sort);
    params = params.append('pageIndex', userParams.pageNumber);
    params = params.append('pageSize', userParams.pageSize);
    if (userParams.search) params = params.append('search', userParams.search);

    return this.http.get<Pagination<User[]>>(this.baseUrl + 'account/users', {
      params,
    });
  }

  getUserProfile(): Observable<UserProfile> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserProfile>(this.baseUrl + 'account/userprofile', { headers });
  }

  createUserProfile(userProfile: UserProfileFormValues): Observable<UserProfile> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<UserProfile>(this.baseUrl + 'account/userprofile', userProfile, { headers });
  }

  updateUserProfile(userProfile: UserProfileFormValues): Observable<UserProfile> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<UserProfile>(this.baseUrl + 'account/userprofile', userProfile, { headers });
  }

  getUserAddress(): Observable<Address> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Address>(this.baseUrl + 'account/address', { headers });
  }

  createUserAddress(address: AddressFormValues): Observable<Address> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Address>(this.baseUrl + 'account/address', address, { headers });
  }

  updateUserAddress(address: AddressFormValues): Observable<Address> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Address>(this.baseUrl + 'account/address/', address, { headers });
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  getUserParams() {
    return this.userParams;
  }

  isAdmin(token: string): boolean {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.role.indexOf('Admin') > -1) {
        return true;
      }
    }
    return false;
  }

  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(this.baseUrl + 'account', { headers }).pipe(
      switchMap((user: User | undefined) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
        }
        return of(user) as any;
      })
    );
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}account/delete/${userId}`);
  }

  login(values: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', values).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
        }
      })
    );
  }

  register(values: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  updateUser(userData: User): Observable<any> {
    return this.http.put<User>(
      `${this.baseUrl}account/update`,
      userData
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(
      this.baseUrl + 'account/emailExists?email=' + email
    );
  }
}
