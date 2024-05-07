import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuelFormValues } from 'src/app/shared/models/fuel';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fuel-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule, NgbModule],
  templateUrl: './fuel-form.component.html',
  styleUrl: './fuel-form.component.scss'
})
export class FuelFormComponent{
  @Input() showPopup = false;
  @Output() save = new EventEmitter<FuelFormValues>();
  @Output() cancel = new EventEmitter<void>();

  fuelName: string = '';


  closePopup() {
    this.cancel.emit();
  }

  saveFuel(): void {
    const fuelFormValues: FuelFormValues = { fuelName: this.fuelName };
    this.save.emit(fuelFormValues);
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
