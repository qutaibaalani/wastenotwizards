import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipientRegistrationComponent } from './recipient-registration/recipient-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProviderRegistrationComponent } from './provider-registration/provider-registration.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProviderPostComponent } from './provider-post/provider-post.component';
import { ReservationComponent } from './reservation/reservation.component';

// Define your routes
const routes: Routes = [
  { path: 'recipient-registration', component: RecipientRegistrationComponent },
  { path: 'provider-registration', component: ProviderRegistrationComponent },
  { path: 'map', component: MapboxComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/success', redirectTo: '/map', pathMatch: 'full'}, /*redirect to map after successful login*/
  { path: 'logout', component: LogoutComponent },
  { path: 'provider-post', component: ProviderPostComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirect to login if no path
];

@NgModule({
  declarations: [
    AppComponent,
    RecipientRegistrationComponent,
    ProviderRegistrationComponent,
    MapboxComponent,
    LoginComponent,
    LogoutComponent,
    ProviderPostComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule, 
    RouterModule.forRoot(routes)  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
