import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { ReservationItemComponent } from './reservation-item/reservation-item.component';
import ReservationDetailsComponent from './reservation-details/reservation-details.component';
import { ReservationRoutingModule } from './reservation-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ReservationComponent,
    ReservationItemComponent,
    ReservationDetailsComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ReservationModule { }
