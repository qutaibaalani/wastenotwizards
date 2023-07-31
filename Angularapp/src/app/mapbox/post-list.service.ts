import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from './user-address.service';

@Injectable({
    providedIn: 'root',
  })


  export class PostAddressService {
    private postListUrl = 'https://waste-not-wizards.onrender.com/api/posts?latitude=$(userLatitude)&longitude=$(userLongitude)'
  
    constructor(private http: HttpClient) {}
    getPostList(userCoor){
        let data = this.http.get(this.postListUrl);
        return data
    }
  }

  export class button {
    test(id){
      console.log("hello")
    }
  }