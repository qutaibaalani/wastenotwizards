import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {
  constructor(private http: HttpClient) { }

  getUserAddress(): Observable<any> {
    return this.http.get('https://waste-not-wizards.onrender.com/api/post-addresses');
  }
}









// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UseraddressService {

//   constructor() { }
// }
