import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-provider-post',
  templateUrl: './provider-post.component.html',
  styleUrls: ['./provider-post.component.css']
})
export class ProviderPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      posted_by_user: ['', Validators.required],
      food_list: ['', Validators.required],
      monetary_value: ['', Validators.required],
      address: ['', Validators.required] // Add the "address" field
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const token = localStorage.getItem('auth_token');
      const postData = this.postForm.value;

      this.http.post('https://waste-not-wizards.onrender.com/api/posts', postData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      }).subscribe(
        res => {
          console.log(res);
          // Clear the form after successful submission
          this.postForm.reset();
        },
        error => console.log('Error!', error)
      );
    }
  }
}
