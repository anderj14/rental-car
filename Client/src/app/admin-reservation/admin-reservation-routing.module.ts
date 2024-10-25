import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminReservationComponent } from './admin-reservation.component';
import ReservationDetailsComponent from './reservation-details/reservation-details.component';

const routes: Routes = [
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
