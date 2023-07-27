import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PostAddressService {
  private apiUrl = 'https://waste-not-wizards.onrender.com/api/posts/geocode';
  private geocodeUrl = 'https://waste-not-wizards.onrender.com/api/geocode/';

  constructor(private http: HttpClient) {}

  getPostAddresses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //geocodeAddress(address: string): Observable<any> {
    //return this.http.post<any>(this.geocodeUrl, { address });
  //}
}
