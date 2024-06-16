import { Component, OnInit } from '@angular/core';
import { VehicleType, VehicleTypeFormValues } from 'src/app/shared/models/vehicleType';
import { VehicleTypeService } from './vehicle-type.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleTypeFormComponent } from './vehicle-type-form/vehicle-type-form.component';

@Component({
  selector: 'app-vehicle-type',
  standalone: true,
  imports: [CommonModule, VehicleTypeFormComponent, FormsModule],
  templateUrl: './vehicle-type.component.html',
  styleUrl: './vehicle-type.component.scss'
})
export class VehicleTypeComponent implements OnInit {

  vehicleTypes: VehicleType[] = [];
  showVehicleTypePopup = false;
  editingVehicleTypeId: number | null = null;
  editVehicleTypeFormValues: VehicleTypeFormValues = new VehicleTypeFormValues();

  constructor(private vehicleTypeService: VehicleTypeService) { }

  ngOnInit(): void {
    this.getVehicleTypes();
  }

  getVehicleTypes() {
    this.vehicleTypeService.getVehicleTypes().subscribe({
      next: (response: VehicleType[]) => {
        this.vehicleTypes = response;
      },
      error: error => console.log(error)
    })
  }

  openVehicleTypePopup(id?: number) {
    if (id) {
      const vehicleTypeToEdit = this.vehicleTypes.find(vehicleType => vehicleType.id === id);
      if (vehicleTypeToEdit) {
        this.editVehicleTypeFormValues = new VehicleTypeFormValues({
          vehicleTypeName: vehicleTypeToEdit.vehicleTypeName
        });
        this.editingVehicleTypeId = id;
      }
    } else {
      this.editVehicleTypeFormValues = new VehicleTypeFormValues();
      this.editingVehicleTypeId = null;
    }
    this.showVehicleTypePopup = true;
  }

  cancelAddVehicleTypePopup() {
    this.showVehicleTypePopup = false;
  }

  saveVehicleType(vehicleTypeFormValues: VehicleTypeFormValues) {
    if (this.editingVehicleTypeId == null) {
      this.vehicleTypeService.createVehicleType(vehicleTypeFormValues).subscribe(
        (response: VehicleType) => {
          this.vehicleTypes.push(response);
          this.showVehicleTypePopup = false;
        },
        error => console.log(error)
      );
    } else {
      this.vehicleTypeService.updateVehicleType(this.editingVehicleTypeId, vehicleTypeFormValues).subscribe(
        (response: VehicleType) => {
          const index = this.vehicleTypes.findIndex(vehicleType => vehicleType.id === response.id);
          if (index !== -1) {
            this.vehicleTypes[index] = response;
          }
          this.showVehicleTypePopup = false;
          this.editingVehicleTypeId = null;
        },
        error => console.log(error)
      );
    }
  }

  deleteVehicleType(id: number) {
    this.vehicleTypeService.deleteVehicleType(id).subscribe(
      () => {
        this.vehicleTypes = this.vehicleTypes.filter(vehicleType => vehicleType.id !== id);
      },
      error => console.log(error)
    );
  }
}
