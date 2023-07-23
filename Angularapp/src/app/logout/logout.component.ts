import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
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
      },
      error => console.log('Error!', error)
    );
  }
}
