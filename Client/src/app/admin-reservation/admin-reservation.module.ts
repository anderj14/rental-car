import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminReservationComponent } from './admin-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { EditReservationFormComponent } from './edit-reservation-form/edit-reservation-form.component';
import { AdminReservationRoutingModule } from './admin-reservation-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { BreadcrumbComponent } from "../shared/components/breadcrumb/breadcrumb.component";
import ReservationDetailsComponent from './reservation-details/reservation-details.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
    declarations: [
        AdminReservationComponent,
        EditReservationComponent,
        EditReservationFormComponent,
        ReservationDetailsComponent
    ],
    imports: [
        CommonModule,
        AdminReservationRoutingModule,
        SharedModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        BreadcrumbComponent,
        NgSelectModule
    ]
})
export class AdminReservationModule { }
