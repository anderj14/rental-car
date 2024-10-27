import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UpdateComponent } from './update/update.component';
import { MaterialModule } from '../material/material.module';
import { AccountComponent } from './account.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserProfileFormComponent } from './user-profile/user-profile-form/user-profile-form.component';
import { ReservationDetailsComponent } from './reservations-list/reservation-details/reservation-details.component';
import { ReservationsListComponent } from './reservations-list/reservations-list.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UpdateComponent,
    AccountComponent,
    UserProfileComponent,
    UserProfileFormComponent,
    UserAddressComponent,
    ReservationDetailsComponent,
    ReservationsListComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AccountModule { }
