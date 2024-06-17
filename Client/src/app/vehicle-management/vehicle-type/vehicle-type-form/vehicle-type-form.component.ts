import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleTypeFormValues } from 'src/app/shared/models/vehicleType';

@Component({
  selector: 'app-vehicle-type-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vehicle-type-form.component.html',
  styleUrl: './vehicle-type-form.component.scss'
})
export class VehicleTypeFormComponent implements OnInit{

  @Input() showPopup = false;
  @Input() initialValues: VehicleTypeFormValues | null = null;
  @Output() save = new EventEmitter<VehicleTypeFormValues>();
  @Output() cancel = new EventEmitter<void>();

  vehicleTypeFormValues: VehicleTypeFormValues = new VehicleTypeFormValues();

  constructor() { }

  ngOnInit(): void {
    if (this.initialValues) {
      this.vehicleTypeFormValues = { ...this.initialValues };
    }
  }

  closePopup() {
    this.cancel.emit();
  }

  saveVehicleType(): void {
    this.save.emit(this.vehicleTypeFormValues);
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
