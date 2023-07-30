import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


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
    private router: Router,
    private auth: AuthService // Inject AuthService here
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const loginData = this.loginForm.value;

      this.http
        .post('https://waste-not-wizards.onrender.com/auth/token/login', loginData, {
          headers: { 'Content-Type': 'application/json' }
        })
        .subscribe({
          next: (response: any) => {
            console.log('Success!', response);
            alert('Welcome, ' + loginData.username + '!');

            // Store the token and username in local storage
            localStorage.setItem('username', loginData.username);
            localStorage.setItem('auth_token', response.auth_token);

            // Get user details after successful login
            this.auth.getUserDetails(loginData.username).subscribe((user) => {
              // Assuming 'user_type' contains the user role (provider or recipient)
              const userRole = user.user_type;

              // Store the user role in local storage
              localStorage.setItem('role', userRole);

              // Redirect user based on their role
              this.auth.redirectUser({role: userRole});
            });
          },
          error: (error) => {
            console.error('Error!', error);
          },
          complete: () => {
            this.loading = false;
          }
        });
    }
  }
}
