import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-recipient-registration',
  templateUrl: './recipient-registration.component.html',
  styleUrls: ['./recipient-registration.component.css']
})
export class RecipientRegistrationComponent implements OnInit {
  recipientForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }  // Inject Router

  ngOnInit() {
    this.recipientForm = this.fb.group({
      username: ['', Validators.required],
      address: [''],
      zipcode: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.recipientForm.valid) {
      const formData = this.recipientForm.value;
      console.log(formData); // Log the form data

      // Make the HTTP request to the Django backend
      this.http.post('https://waste-not-wizards.onrender.com/auth/users/', formData, {
        headers: {'Content-Type': 'application/json'}
      }).subscribe(
        response => {
          console.log('Success!', response);
          alert('Thank you for registering!');  // Show message
          this.router.navigate(['/login']);  // Redirect to login page
        },
        error => console.error('Error!', error)
      );
    }
  }
}
