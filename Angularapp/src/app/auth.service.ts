import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  // Function to get the user details
  getUserDetails(username): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Get the token from local storage
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Token ${token}` // Add Authorization header
      })
    };
    return this.http.get(`https://waste-not-wizards.onrender.com/api/profile/${username}`, httpOptions);
  }

  // Function to redirect user based on their role
  redirectUser(user): void {
    if (user.role === 'provider') {
      this.router.navigate(['/provider-post']);
    } else if (user.role === 'recipient') {
      this.router.navigate(['/map']);
    }
  }
}
