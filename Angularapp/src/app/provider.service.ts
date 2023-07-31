import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(private http: HttpClient) { }

  getPastPosts(id: string): Observable<any> {
    const token = localStorage.getItem('auth_token');
    return this.http.get(`https://waste-not-wizards.onrender.com/api/profile/${id}/posts/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
  }

  createPost(postData: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    return this.http.post('https://waste-not-wizards.onrender.com/api/posts', postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    });
  }
}

