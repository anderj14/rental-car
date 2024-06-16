import { Component, Input, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand';
import { Fuel } from 'src/app/shared/models/fuel';
import { Model } from 'src/app/shared/models/model';
import { Status } from 'src/app/shared/models/status';
import { VehicleType } from 'src/app/shared/models/vehicleType';
import { VehicleFormValues } from 'src/app/shared/models/vehicles';
import { EditVehicleService } from '../edit-vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/vehicle/vehicle.service';

@Component({
  selector: 'app-edit-vehicle-form',
  templateUrl: './edit-vehicle-form.component.html',
  styleUrls: ['./edit-vehicle-form.component.scss']
})
export class EditVehicleFormComponent implements OnInit {

  @Input() vehicle!: VehicleFormValues;
  @Input() brands!: Brand[];
  @Input() models!: Model[];
  @Input() fuels!: Fuel[];
  @Input() statuses!: Status[];
  @Input() vehiclesType!: VehicleType[];

  constructor(
    private editVehicleService: EditVehicleService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router) {
    this.vehicle = new VehicleFormValues();
  }

  ngOnInit(): void {

  }

  updatePrice(event: any) {
    this.vehicle.rentalPrice = event;
  }

  loadModelsByBrand(brandId: number) {
    if (brandId) {
      this.vehicleService.getModelsByBrand(brandId).subscribe((models: Model[]) => {
        this.models = models;
      });
    } else {
      this.models = [];
    }
  }

  onSubmit(vehicle: VehicleFormValues) {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedVehicle = { ...this.vehicle, ...vehicle, rentalPrice: +vehicle.rentalPrice };
      this.editVehicleService.updateVehicle(updatedVehicle, +id!).subscribe((response: any) => {
        this.router.navigate(['/admin-vehicle']);
      });
    } else {
      const newVehicle = { ...vehicle, rentalPrice: +vehicle.rentalPrice };
      this.editVehicleService.createVehicle(newVehicle).subscribe((response: any) => {
        this.router.navigate(['/admin-vehicle']);
      });
    }
  }
}
