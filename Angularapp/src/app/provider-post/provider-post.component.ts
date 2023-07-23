import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-provider-post',
  templateUrl: './provider-post.component.html',
  styleUrls: ['./provider-post.component.css']
})
export class ProviderPostComponent implements OnInit {

  postForm = new FormGroup({
    foodName: new FormControl('', Validators.required),
    foodDescription: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    pickupLocation: new FormControl('', Validators.required),
    expirationDate: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const token = localStorage.getItem('auth_token');
      this.http.post('https://waste-not-wizards.onrender.com/api/posts', this.postForm.value, {
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
