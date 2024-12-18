import { Component, Input } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand';
import { Fuel } from 'src/app/shared/models/fuel';
import { Model } from 'src/app/shared/models/model';
import { Status } from 'src/app/shared/models/status';
import { VehicleType } from 'src/app/shared/models/vehicleType';
import { VehicleFormValues } from 'src/app/shared/models/vehicles';
import { EditVehicleService } from '../edit-vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-vehicle-form',
  templateUrl: './edit-vehicle-form.component.html',
  styleUrls: ['./edit-vehicle-form.component.scss'],
})
export class EditVehicleFormComponent{
  @Input() vehicle!: VehicleFormValues;
  @Input() brands!: Brand[];
  @Input() models!: Model[];
  @Input() fuels!: Fuel[];
  @Input() statuses!: Status[];
  @Input() vehiclesType!: VehicleType[];
  @Input() isEditMode!: boolean;

  constructor(
    private editVehicleService: EditVehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.vehicle = new VehicleFormValues();
  }

  updatePrice(event: any) {
    this.vehicle.rentalPrice = event;
  }

  onSubmit(vehicle: VehicleFormValues) {
    console.log('Form submitted with values:', vehicle);
    const id = this.route.snapshot.paramMap.get('id');

    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedVehicle = {
        ...this.vehicle,
        ...vehicle,
        rentalPrice: +vehicle.rentalPrice,
      };
      this.editVehicleService
        .updateVehicle(updatedVehicle, +id!)
        .subscribe((response: any) => {
          console.log('Vehicle updated', response);
          this.router.navigate(['/admin-vehicle']);
        });
    } else {
      const newVehicle = { ...vehicle, rentalPrice: +vehicle.rentalPrice };
      this.editVehicleService
        .createVehicle(newVehicle)
        .subscribe((response: any) => {
          console.log('Vehicle created', response);
          this.router.navigate(['/admin-vehicle']);
        });
    }
  }
}
