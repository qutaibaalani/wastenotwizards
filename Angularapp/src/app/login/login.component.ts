import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder, private http: HttpClient) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
    onSubmit() {
        if (this.loginForm.valid) {
            const loginData = this.loginForm.value;
            this.http.post('https://waste-not-wizards.onrender.com/auth/token/login', loginData, {
                headers: { 'Content-Type': 'application/json' }
            }).subscribe(
                response => {
                    console.log('Success!', response);
                },
                error => console.error('Error!, error')
            );
        }
    }

}