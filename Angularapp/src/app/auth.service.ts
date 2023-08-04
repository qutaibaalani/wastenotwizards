import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  getUserDetails(username): Observable<any> {
    const token = localStorage.getItem('auth_token'); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Token ${token}`
      })
    };
    return this.http.get(`https://waste-not-wizards.onrender.com/api/profile/${username}`, httpOptions);
  }

  onLogout(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    return this.http.post('https://waste-not-wizards.onrender.com/auth/token/logout', {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).pipe(
      tap(res => {
        console.log(res);
        localStorage.removeItem('auth_token'); // Remove the auth token 
        this.router.navigate(['/login']); // go to login page after successful logout
      },
      error => {
        console.log('Error!', error);
      })
    );
  }

  redirectUser(user): void {
    if (user.is_provider) {
      this.router.navigate(['/provider-post']);
    } else if (user.is_receiver) {
      this.router.navigate(['/map']);
    }
  }
}
