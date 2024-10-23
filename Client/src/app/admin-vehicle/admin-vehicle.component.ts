import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IVehicle } from '../shared/models/vehicles';
import { VehicleParams } from '../shared/models/vehicleParams';
import { VehicleService } from '../vehicle/vehicle.service';
import { EditVehicleService } from './edit-vehicle.service';
import { Model } from '../shared/models/model';
import { Brand } from '../shared/models/brand';
import { Fuel } from '../shared/models/fuel';
import { Status } from '../shared/models/status';
import { VehicleType } from '../shared/models/vehicleType';

@Component({
  selector: 'app-admin-vehicle',
  templateUrl: './admin-vehicle.component.html',
  styleUrls: ['./admin-vehicle.component.scss']
})
export class AdminVehicleComponent implements OnInit {

  @ViewChild('search') searchTerm?: ElementRef;

  vehicles!: IVehicle[];
  totalCount!: number;
  vehicleParams = new VehicleParams();

  brands!: Brand[];
  models!: Model[];
  fuels!: Fuel[];
  statuses!: Status[];
  vehiclesType!: VehicleType[];
  sortOption = [
    { name: 'Alphabetical', value: 'vehicleName' },
    { name: 'Price: Low To High', value: 'priceAsc' },
    { name: 'Price: High To Low', value: 'priceDesc' },
  ];
  selectedBrandId: number | null = null;
  selectedModelId: number | null = null;
  selectedFuelId: number | null = null;
  selectedStatusId: number | null = null;
  selectedVehicleTypeId: number | null = null;
  showAllModels = false;


  constructor(private vehicleService: VehicleService, private editVehicleService: EditVehicleService) {
    this.vehicleParams = this.vehicleService.getVehicleParams();
  }
  ngOnInit(): void {
    this.getVehicles();
    this.getBrands();
    this.getModels();
    this.getFuels();
    this.getStatuses();
    this.getVehiclesType();
  }

  getVehicles() {
    this.vehicleService.getVehicles(this.vehicleParams).subscribe({
      next: response => {
        this.vehicles = response.data;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    });
  }

  onPageChanged(event: any) {
    const params = this.vehicleService.getVehicleParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.vehicleService.setVehicleParams(params);
      this.getVehicles();
    }
  }

  deleteVehicle(id: number) {
    this.editVehicleService.deleteVehicle(id).subscribe((response: any) => {
      this.vehicles.splice(this.vehicles.findIndex(p => p.id === id), 1);
      this.totalCount--;
    });
  }

  getStatusClass(status: string): string {
    const lowercaseStatus = status.toLowerCase();

    switch (lowercaseStatus) {
      case 'available':
        return 'available';
      case 'rented':
        return 'rented';
      case 'reserved':
        return 'reserved';
      default:
        return '';
    }
  }

  getBrands() {
    this.vehicleService.getBrands().subscribe({
      next: response => {
        this.brands = [{ id: 0, brandName: 'All' }, ...response]
        console.log(response);
      },
      error: error => console.log(error)
    });
  }
  getModels() {
    this.vehicleService.getModels().subscribe({
      next: response => this.models = [{ id: 0, modelName: 'All' }, ...response],
      error: error => console.log(error)
    });
  }

  get modelsToShow(): Model[] {
    return this.showAllModels ? this.models : this.models.slice(0, 5);
  }

  getFuels() {
    this.vehicleService.getFuels().subscribe({
      next: response => this.fuels = [{ id: 0, fuelName: 'All' }, ...response],
      error: error => console.log(error)
    });
  }

  getStatuses() {
    this.vehicleService.getStatutes().subscribe({
      next: response => this.statuses = [{ value: 0, statusName: 'All' }, ...response],
      error: error => console.log(error)
    });
  }

  getVehiclesType() {
    this.vehicleService.getVehiclesType().subscribe({
      next: response => this.vehiclesType = [{ id: 0, vehicleTypeName: 'All' }, ...response],
      error: error => console.log(error)
    });
  }

  onBrandSelected(brandId: number) {
    this.selectedBrandId = brandId === this.selectedBrandId ? null : brandId;
    this.vehicleParams.brandId = this.selectedBrandId || 0;
    this.vehicleParams.pageNumber = 1;

    if (this.selectedBrandId) {
      this.getModelsByBrand(this.selectedBrandId);
    } else {
      this.getModels();
      this.selectedModelId = null;
      this.getVehicles();
    }

    this.getVehicles();
  }

  getModelsByBrand(brandId: number) {
    this.vehicleService.getModelsByBrand(brandId).subscribe({
      next: response => {
        this.models = [{ id: 0, modelName: 'All' }, ...response];
        this.selectedModelId = null;
      },
      error: error => console.log(error)
    })
  }

  onModelSelected(modelId: number) {
    this.selectedModelId = modelId === this.selectedModelId ? null : modelId;
    this.vehicleParams.modelId = this.selectedModelId || 0;
    this.vehicleParams.pageNumber = 1;
    this.getVehicles();
  }

  onFuelSelected(fuelId: number) {
    this.selectedFuelId = fuelId === this.selectedFuelId ? null : fuelId;
    this.vehicleParams.fuelId = this.selectedFuelId || 0;
    this.vehicleParams.pageNumber = 1;
    this.getVehicles();
  }

  // onStatusSelected(statusId: number) {
  //   this.selectedStatusId = statusId === this.selectedStatusId ? null : statusId;
  //   this.vehicleParams.statusId = this.selectedStatusId || 0;
  //   this.vehicleParams.pageNumber = 1;
  //   this.getVehicles();
  // }

  onVehicleTypeSelected(vehicleTypeId: number) {
    this.selectedVehicleTypeId = vehicleTypeId === this.selectedVehicleTypeId ? null : vehicleTypeId;
    this.vehicleParams.vehicleTypeId = this.selectedVehicleTypeId || 0;
    this.vehicleParams.pageNumber = 1;
    this.getVehicles();
  }

  onSortSelected(event: any) {
    this.vehicleParams.sort = event.target.value;
    this.getVehicles();
  }

  onSearch() {
    this.vehicleParams.search = this.searchTerm?.nativeElement.value;
    this.vehicleParams.pageNumber = 1;
    this.getVehicles();
  }

  showPopup = false;

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  closePopup() {
    this.showPopup = false;
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
