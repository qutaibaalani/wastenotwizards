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
    private auth: AuthService 
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

            localStorage.setItem('username', loginData.username);
            localStorage.setItem('auth_token', response.auth_token);

            this.auth.getUserDetails(loginData.username).subscribe((user) => {
              // Save the user's ID in local storage
              localStorage.setItem('id', user.id.toString());

              if (user.is_provider) {
                localStorage.setItem('role', 'provider');
              } else if (user.is_receiver) {
                localStorage.setItem('role', 'receiver');
              }

              this.auth.redirectUser(user);
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
