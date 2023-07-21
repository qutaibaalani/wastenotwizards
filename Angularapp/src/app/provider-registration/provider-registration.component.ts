import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-provider-registration',
  templateUrl: './provider-registration.component.html',
  styleUrls: ['./provider-registration.component.css']
})
export class ProviderRegistrationComponent implements OnInit {
  providerForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.providerForm = this.fb.group({
      username: ['', Validators.required],
      businessName: [''],
      address: [''],
      zipcode: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.providerForm.valid) {
      const formData = this.providerForm.value;

      // Log the form data
      console.log(formData);

      // Make the HTTP request to the backend
      this.http.post('https://waste-not-wizards.onrender.com/auth/users/', formData, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(
        response => console.log('Success!', response),
        error => console.error('Error!', error)
      );
    }
  }
}
