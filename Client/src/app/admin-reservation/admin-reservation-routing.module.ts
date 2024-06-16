import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { AdminReservationComponent } from './admin-reservation.component';
import ReservationDetailsComponent from './reservation-details/reservation-details.component';

const routes: Routes = [
  { path: 'create', component: EditReservationComponent, data: { breadcrumb: 'Create' } },
  { path: 'edit/:id', component: EditReservationComponent, data: { breadcrumb: 'Edit' } },
  { path: ':id', component: ReservationDetailsComponent, data: { breadcrumb: { alias: 'reservationDetails' } } },
  { path: '', component: AdminReservationComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminReservationRoutingModule { }
