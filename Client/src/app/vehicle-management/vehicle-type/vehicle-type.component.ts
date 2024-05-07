import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
export class VehicleTypeComponent implements OnInit{

  vehicleTypes: VehicleType[] = [];
  showAddVehicleTypePopup = false;
  editVehicleTypeFormValues: VehicleTypeFormValues | null = null;

  constructor(private vehicleTypeService: VehicleTypeService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getVehicleTypes();
  }

  getVehicleTypes() {
    this.vehicleTypeService.getVehicleTypes().subscribe({
      next: (response: VehicleType[]) => {
        this.vehicleTypes = response;
        console.log(this.vehicleTypes);
      },
      error: error => console.log(error)
    })
  }

  openAddVehicleTypePopup() {
    this.showAddVehicleTypePopup = true;
  }

  cancelAddVehicleTypePopup() {
    this.showAddVehicleTypePopup = false;
    this.editVehicleTypeFormValues = null;
  }

  saveVehicleType(vehicleTypeFormValues: VehicleTypeFormValues) {
    if (this.editVehicleTypeFormValues) {
      this.vehicleTypeService.updateVehicleType(this.editVehicleTypeFormValues.id!, vehicleTypeFormValues).subscribe(
        (response: VehicleType) => {
          const index = this.vehicleTypes.findIndex(vehicleType => vehicleType.id === response.id);
          if (index !== -1) {
            this.vehicleTypes[index] = response;
          }
          this.showAddVehicleTypePopup = false;
          this.editVehicleTypeFormValues = null;
        },
        error => console.log(error)
      );
    } else {
      this.vehicleTypeService.createVehicleType(vehicleTypeFormValues).subscribe(
        (response: VehicleType) => {
          this.vehicleTypes.push(response);
          this.showAddVehicleTypePopup = false;
        },
        error => console.log(error)
      );
    }
  }
  
  editVehicleType(id: number) {
    const vehicleTypeToEdit = this.vehicleTypes.find(vehicleType => vehicleType.id === id);
    if (vehicleTypeToEdit) {
      const vehicleTypeFormValues = new VehicleTypeFormValues({
        id: vehicleTypeToEdit.id,
        vehicleTypeName: vehicleTypeToEdit.vehicleTypeName
      });

      this.showAddVehicleTypePopup = true;
      this.editVehicleTypeFormValues = vehicleTypeFormValues;
    } else {
      console.log('Tipo de vehículo no encontrado para editar');
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
