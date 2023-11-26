import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminVehicleComponent } from './admin-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { SharedModule } from '../shared/shared.module';
import { AdminVehicleRoutingModule } from './admin-vehicle-routing.module';
import { EditVehicleFormComponent } from './edit-vehicle-form/edit-vehicle-form.component';


@NgModule({
  declarations: [
    AdminVehicleComponent,
    EditVehicleComponent,
    EditVehicleFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminVehicleRoutingModule
  ]
})
export class AdminVehicleModule { }
