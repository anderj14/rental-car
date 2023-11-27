import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminReservationComponent } from './admin-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { EditReservationFormComponent } from './edit-reservation-form/edit-reservation-form.component';



@NgModule({
  declarations: [
    AdminReservationComponent,
    EditReservationComponent,
    EditReservationFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminReservationModule { }
