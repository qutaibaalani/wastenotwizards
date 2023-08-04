import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface Address {
  latitude: number;
  longitude: number;
  pin: any;
}

interface user_address {
  username: string;
  user_latitude: number;
  user_longitude: number;
}

export interface Post {
  posted_by_user: object;
  food_list: string;
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
  private userGeocode = 'https://waste-not-wizards.onrender.com/apiuser/geocode'
  private userLocationUrl = 'https://waste-not-wizards.onrender.com/api/profile/';

  private geocodeUrl = 'https://waste-not-wizards.onrender.com/api/geocode/';
  private postList = 'https://waste-not-wizards.onrender.com/api/posts';

  constructor(private http: HttpClient) {}


  geocodeAddresses() {
    return this.http.get(this.apiUrl)
  }
  
  getPostAddresses(): Observable<any> {
    return this.http.get<any>(this.postList)
  }

  getUserAddresses(username, authToken): Observable<user_address[]> {
    const headers = {
      Authorization: `Token ${authToken}`,
    };
    const fullUserLocationUrl = this.userLocationUrl + username;
    this.http.get<user_address[]>(this.userGeocode)
    return this.http.get<user_address[]>(fullUserLocationUrl, { headers })

}
}