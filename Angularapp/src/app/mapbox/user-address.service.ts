import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Address {
  pins: object
}

interface user_address {
  user_latitude: number;
  user_longitude: number;
}

export interface Post {
  posted_by_use: object;
  food_lis: string;
  monetary_value: number;
  address: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root',
})

export class PostAddressService {
  private apiUrl = 'https://waste-not-wizards.onrender.com/api/posts/geocode';
  private userLocationUrl = 'https://waste-not-wizards.onrender.com/api/profile/';
  private geocodeUrl = 'https://waste-not-wizards.onrender.com/api/geocode/';
  private postList = 'https://waste-not-wizards.onrender.com/api/posts';

  constructor(private http: HttpClient) {}

  getPostAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl);
  }

  getUserAddresses(username, authToken): Observable<user_address[]> {

    const headers = {
      Authorization: `Bearer ${authToken.auth_token}`,
    };
    const fullUserLocationUrl = '' + this.userLocationUrl + username + "/"
    return this.http.get<user_address[]>(fullUserLocationUrl, { headers })
}


  //geocodeAddress(address: string): Observable<any> {
    //return this.http.post<any>(this.geocodeUrl, { address });
  //}
}
