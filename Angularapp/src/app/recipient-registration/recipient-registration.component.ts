import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipient-registration',
  templateUrl: './recipient-registration.component.html',
  styleUrls: ['./recipient-registration.component.css']
})
export class RecipientRegistrationComponent implements OnInit {
  recipientForm = this.fb.group({
    name: ['', Validators.required],
    address: [''],
    zipcode: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  onSubmit() {
    if (this.recipientForm.valid) {
      console.log(this.recipientForm.value);
      // form to BE here
    }
  }
}
