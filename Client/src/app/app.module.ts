
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { NgxWebstorageModule, SessionStorage } from 'ngx-webstorage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { CustomerInfoFormComponent } from './customer-info/customer-info-form/customer-info-form.component';
import { ReservationInfoComponent } from './reservation-info/reservation-info.component';
import { ReservationInfoFormComponent } from './reservation-info/reservation-info-form/reservation-info-form.component';
// import ReservationDetailsComponent from './admin-reservation/reservation-details/reservation-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CustomerInfoComponent,
    CustomerInfoFormComponent,
    ReservationInfoComponent,
    ReservationInfoFormComponent,
    // ReservationDetailsComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    RouterModule,
    MaterialModule,
    VehicleModule,
    NgxWebstorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    // SessionStorageService, 
    {
      provide: SessionStorage,
      useFactory: () => SessionStorage,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
