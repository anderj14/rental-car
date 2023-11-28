import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { AdminReservationComponent } from './admin-reservation.component';

const routes: Routes = [
  { path: '', component: AdminReservationComponent },
  { path: 'create-reservation', component: EditReservationComponent, data: { breadcrumb: 'Create' } },
  { path: 'edit-reservation/:id', component: EditReservationComponent, data: { breadcrumb: 'Edit' } },
]


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
