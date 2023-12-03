import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminReservationComponent } from './admin-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { EditReservationFormComponent } from './edit-reservation-form/edit-reservation-form.component';
import { AdminReservationRoutingModule } from './admin-reservation-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminReservationComponent,
    EditReservationComponent,
    EditReservationFormComponent,
  ],
  imports: [
    CommonModule,
    AdminReservationRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AdminReservationModule { }
