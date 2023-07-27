import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.http
        .post('https://waste-not-wizards.onrender.com/auth/token/login', loginData, {
          headers: { 'Content-Type': 'application/json' }
        })
        .subscribe({
          next: (response: any) => {
            console.log('Success!', response);
            this.loading = false;
            alert('Welcome, ' + loginData.username + '!');

            // Store the token in local storage
            localStorage.setItem('auth_token', response.auth_token);

            setTimeout(() => this.router.navigate(['/map']), 500);
          },
          error: (error) => {
            console.error('Error!', error);
            this.loading = false;
          }
        });
    }
  }
}
