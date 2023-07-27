import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAddress } from './mapbox.component';

@Injectable({
  providedIn: 'root',
})
export class UserAddressService {
  private apiUrl = 'https://waste-not-wizards.onrender.com/api/post-addresses/';
  private geocodeUrl = 'https://waste-not-wizards.onrender.com/api/geocode/';

  constructor(private http: HttpClient) {}

  getUserAddresses(): Observable<UserAddress[]> {
    return this.http.get<UserAddress[]>(this.apiUrl);
  }

  geocodeAddress(address: string): Observable<any> {
    return this.http.post<any>(this.geocodeUrl, { address });
  }
}
