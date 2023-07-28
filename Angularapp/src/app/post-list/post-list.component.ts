import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  //posts: Post[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Assuming you have the user's latitude and longitude, replace these with the actual values.
    const userLatitude = 12.345;
    const userLongitude = 67.890;

    // Make an API request to your Django backend to fetch the closest posts.
    // Replace 'your-api-endpoint' with the actual URL of your Django API endpoint.
    //this.http.get<Post[]>(`your-api-endpoint?latitude=${userLatitude}&longitude=${userLongitude}`)
      //.subscribe(
        //(data) => {
          //this.posts = data.slice(0, 10); // Assuming the API returns the posts as an array.
        //},
        //(error) => {
          //console.error('Error fetching posts:', error);
        //}
      //);
  }
}
