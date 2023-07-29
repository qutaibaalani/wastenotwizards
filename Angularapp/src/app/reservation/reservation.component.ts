import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

    loading = false; // Add this line

    postForm = new FormGroup({
        user: new FormControl('', Validators.required),
        foodName: new FormControl('', Validators.required), // Add foodName FormControl nonsense
    });

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
    
    }

    onSubmit(): void {
        this.loading = true; // set loading to true when onSubmit starts
        if (this.postForm.valid) {
            const token = localStorage.getItem('auth_token');
            this.http.post('https://waste-not-wizards.onrender.com/api/reservations', this.postForm.value, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
                }
            }).subscribe(
                res => {
                    console.log(res);
                    this.loading = false; // set loading to false when request is complete
                },
                error => {
                    console.log('Error!', error);
                    this.loading = false; // set loading to false when request is complete even if there is an error
                }
            );
        } else {
            this.loading = false; // set loading to false when form is not valid
        }
    }
}
