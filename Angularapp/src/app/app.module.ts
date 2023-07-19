import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RecipientRegistrationComponent } from './recipient-registration/recipient-registration.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RecipientRegistrationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]) /* Add RouterModule to the imports array with an empty routes configuration*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


