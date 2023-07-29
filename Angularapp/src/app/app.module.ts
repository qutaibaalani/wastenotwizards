import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RecipientRegistrationComponent } from './recipient-registration/recipient-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProviderRegistrationComponent } from './provider-registration/provider-registration.component';
import { MapBoxComponent } from './mapbox/mapbox.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProviderPostComponent } from './provider-post/provider-post.component';
import { ReservationComponent } from './reservation/reservation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PostListComponent } from './post-list/post-list.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';

const routes: Routes = [
  { path: 'recipient-registration', component: RecipientRegistrationComponent },
  { path: 'provider-registration', component: ProviderRegistrationComponent },
  { path: 'map', component: MapBoxComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/success', redirectTo: '/map', pathMatch: 'full'}, /*redirect to map after successful login*/
  { path: 'logout', component: LogoutComponent },
  { path: 'provider-post', component: ProviderPostComponent },
  { path: 'reservation', component: ReservationComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirect to login if no path
];

@NgModule({
  declarations: [
    AppComponent,
    RecipientRegistrationComponent,
    ProviderRegistrationComponent,
    MapBoxComponent,
    LoginComponent,
    LogoutComponent,
    ProviderPostComponent,
    ReservationComponent,
    PostListComponent,
    SplashScreenComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule, 
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule, 
    MatToolbarModule, 
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }