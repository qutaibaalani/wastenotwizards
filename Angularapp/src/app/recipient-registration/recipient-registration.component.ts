import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipient } from '../models/recipient.model';

@Component({
    selector: 'app-recipient-registration',
    templateUrl: './recipient-registration.component.html',
    styleUrls: ['./recipient-registration.component.css']
})
export class RecipientRegistrationComponent implements OnInit {

    recipientForm: FormGroup = this.formBuilder.group({}); // initialize empty form

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.recipientForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    onSubmit(): void {
        if (this.recipientForm.valid) {
            const newRecipient = new Recipient(
                this.recipientForm.get('username')?.value,  /*chaining*/
                this.recipientForm.get('password')?.value   
            );
            console.log(newRecipient);
            
        }
    }

}
