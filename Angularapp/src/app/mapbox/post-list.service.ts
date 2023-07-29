import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Post {
    foodlist: string;
}

@Injectable({
    providedIn: 'root',
  })


  export class PostAddressService {
    private postListUrl = 'https://waste-not-wizards.onrender.com/api/posts?latitude=$(userLatitude)&longitude=$(userLongitude)'
  
    constructor(private http: HttpClient) {}
    posts: Post[] = []
    getPostList(userCoor): Observable<Post[]>{
        let data = this.http.get<Post[]>(this.postListUrl);
        return data
    }
  }