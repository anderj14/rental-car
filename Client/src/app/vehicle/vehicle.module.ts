import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleItemComponent } from './vehicle-item/vehicle-item.component';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';



@NgModule({
    declarations: [
        VehicleComponent,
        VehicleDetailsComponent,
        VehicleItemComponent,
    ],
    exports: [
        VehicleItemComponent
    ],
    imports: [
        CommonModule,
        VehicleRoutingModule,
        SharedModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        BreadcrumbComponent
    ]
})
export class VehicleModule { }
