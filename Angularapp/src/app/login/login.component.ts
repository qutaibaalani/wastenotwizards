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
  loading: boolean = false; // Initialize as false so spinner does not show on load

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
    if (this.loginForm.valid) {
      this.loading = true; // Set loading to true user presses button
      const loginData = this.loginForm.value;
      this.http
        .post('https://waste-not-wizards.onrender.com/auth/token/login', loginData, {
          headers: { 'Content-Type': 'application/json' }
        })
        .subscribe({
          next: (response: any) => {
            console.log('Success!', response);
            alert('Welcome, ' + loginData.username + '!');


    onSubmit() {
        this.loading = true; // set loading to true when the form is submitted
        if (this.loginForm.valid) {
            const loginData = this.loginForm.value;

            this.http.post('https://waste-not-wizards.onrender.com/auth/token/login', loginData, {
                headers: { 'Content-Type': 'application/json' }
            }).subscribe({
                next: (response) => {
                    console.log('Success!', response);
                    localStorage.setItem("token", JSON.stringify(response))
                    localStorage.setItem("username", JSON.stringify(loginData.username))
                    localStorage.setItem('auth_token', response.auth_token);
                    this.loading = false; // set loading to false when response is received
                    alert('Welcome, ' + loginData.username + '!');
                    setTimeout(() => this.router.navigate(['/map']), 500); // delay nav to allow alert to show
                },
                error: (error) => {
                    console.error('Error!', error);
                    this.loading = false; // set loading to false when an error occurs
                },
              complete: () => {
            this.loading = false; // Set loading to false when req done
              }
            });
        }
    }
  }
}
