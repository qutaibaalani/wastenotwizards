import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  loading = false;  // Initialize loading as false

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.loading = true;  // Set loading to true when onLogout starts
    const token = localStorage.getItem('auth_token');
    this.http.post('https://waste-not-wizards.onrender.com/auth/token/logout', {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).subscribe(
      res => {
        console.log(res);
        localStorage.removeItem('auth_token'); // Remove the auth token 
        this.router.navigate(['/login']); // go to login page after successful logout
        this.loading = false;  // Set loading back to false after logout is successful
      },
      error => {
        console.log('Error!', error);
        this.loading = false;  // Set loading back to false even if there is an error
      }
    );
  }
}
