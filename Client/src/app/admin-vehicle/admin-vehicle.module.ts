import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminVehicleComponent } from './admin-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { SharedModule } from '../shared/shared.module';
import { AdminVehicleRoutingModule } from './admin-vehicle-routing.module';
import { EditVehicleFormComponent } from './edit-vehicle-form/edit-vehicle-form.component';
import { EditVehiclePhotosComponent } from "./edit-vehicle-photos/edit-vehicle-photos.component";
import { MaterialModule } from '../material/material.module';


@NgModule({
    declarations: [
        AdminVehicleComponent,
        EditVehicleComponent,
        EditVehicleFormComponent,
        EditVehiclePhotosComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AdminVehicleRoutingModule,
        MaterialModule
    ]
})
export class AdminVehicleModule { }
