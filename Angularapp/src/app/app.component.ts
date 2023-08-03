import { Component } from '@angular/core';
import { AuthService } from './auth.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  loading = false; // Init loading false

  constructor(private authService: AuthService) { } 

  onLogout() {
    this.loading = true;
    this.authService.onLogout().subscribe(
      () => {
        this.loading = false; 
      },
      (error) => {
        console.log('Error!', error);
        this.loading = false; 
      }
    ); 
  }
}
