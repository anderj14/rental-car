import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand';
import { Fuel } from 'src/app/shared/models/fuel';
import { Model } from 'src/app/shared/models/model';
import { Status } from 'src/app/shared/models/status';
import { VehicleType } from 'src/app/shared/models/vehicleType';
import { IVehicle, VehicleFormValues } from 'src/app/shared/models/vehicles';
import { VehicleService } from 'src/app/vehicle/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss'],
})
export class EditVehicleComponent implements OnInit {
  vehicle!: IVehicle;
  vehicleFormValues!: VehicleFormValues;
  brands!: Brand[];
  models!: Model[];
  fuels!: Fuel[];
  statuses!: Status[];
  vehiclesType!: VehicleType[];
  isEditMode: boolean = false;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute
  ) {
    this.vehicleFormValues = new VehicleFormValues();
  }

  ngOnInit(): void {
    const brands = this.getBrands();
    const models = this.getModels();
    const fuels = this.getFuels();
    const statuses = this.getStatuses();
    const vehiclesType = this.getVehiclesType();

    forkJoin([models, brands, fuels, statuses, vehiclesType]).subscribe(
      (results) => {
        this.models = results[0];
        this.brands = results[1];
        this.fuels = results[2];
        this.statuses = results[3];
        this.vehiclesType = results[4];
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.isEditMode = this.route.snapshot.url[0].path === 'edit';
        if (this.isEditMode) {
          this.loadVehicle();
        }
      }
    );
  }

  updatePrice(event: any) {
    this.vehicle.rentalPrice = event;
  }

  loadVehicle() {
    const id = this.route.snapshot.paramMap.get('id');
    this.vehicleService.getVehicle(+id!).subscribe((response: any) => {
      const brandId =
        this.brands &&
        this.brands.find((x) => x.brandName === response.brand)?.id;
      const modelId =
        this.models &&
        this.models.find((x) => x.modelName === response.model)?.id;
      const fuelId =
        this.fuels && this.fuels.find((x) => x.fuelName === response.fuel)?.id;
      const statusId =
        this.statuses &&
        this.statuses.find((x) => x.statusName === response.status)?.value;
      const vehicleTypeId =
        this.vehiclesType &&
        this.vehiclesType.find(
          (x) => x.vehicleTypeName === response.vehicleType
        )?.id;

      this.vehicle = response;
      this.vehicleFormValues = {
        ...response,
        brandId,
        modelId,
        fuelId,
        statusId,
        vehicleTypeId,
      };
    });
  }

  getBrands() {
    return this.vehicleService.getBrands();
  }

  getModels() {
    return this.vehicleService.getModels();
  }

  getFuels() {
    return this.vehicleService.getFuels();
  }

  getStatuses() {
    return this.vehicleService.getStatutes();
  }

  getVehiclesType() {
    return this.vehicleService.getVehiclesType();
  }
}
