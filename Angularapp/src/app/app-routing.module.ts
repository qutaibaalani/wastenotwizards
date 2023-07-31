import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { RecipientRegistrationComponent } from './recipient-registration/recipient-registration.component';
import { ProviderRegistrationComponent } from './provider-registration/provider-registration.component';
import { MapBoxComponent } from './mapbox/mapbox.component';
import { ProviderPostComponent } from './provider-post/provider-post.component';
import { ReservationComponent } from './reservation/reservation.component';
import { LogoutComponent } from './logout/logout.component';

// Import guard
import { ProviderPostGuard } from './provider-post/provider-post.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recipient-registration', component: RecipientRegistrationComponent },
  { path: 'provider-registration', component: ProviderRegistrationComponent },
  { path: 'map', component: MapBoxComponent },
  { path: 'provider-post', component: ProviderPostComponent, canActivate: [ProviderPostGuard] },
  { path: 'reservation', component: ReservationComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
