import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components
import { LoginComponent } from './login/login.component';
import { RecipientRegistrationComponent } from './recipient-registration/recipient-registration.component';
import { ProviderRegistrationComponent } from './provider-registration/provider-registration.component';
import { MapComponent } from './map/map.component';
import { ProviderPostComponent } from './provider-post/provider-post.component';
import { ReservationComponent } from './reservation/reservation.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recipient-registration', component: RecipientRegistrationComponent },
  { path: 'provider-registration', component: ProviderRegistrationComponent },
  { path: 'map', component: MapComponent },
  { path: 'provider-post', component: ProviderPostComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
