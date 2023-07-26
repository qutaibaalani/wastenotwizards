import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  postForm = new FormGroup({
      user: new FormControl('', Validators.required),
  })

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    
  }

onSubmit(): void {
  if (this.postForm.valid) {
    const token = localStorage.getItem('auth_token');
    this.http.post('https://waste-not-wizards.onrender.com/api/reservations', this.postForm.value, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).subscribe(
      res => console.log(res),
      error => console.log('Error!', error)
    );
  }
}
}