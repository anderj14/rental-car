import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuelFormValues } from 'src/app/shared/models/fuel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fuel-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule, NgbModule],
  templateUrl: './fuel-form.component.html',
  styleUrl: './fuel-form.component.scss'
})
export class FuelFormComponent implements OnInit{
  @Input() showPopup = false;
  @Input() initialValues: FuelFormValues | null = null;
  @Output() save = new EventEmitter<FuelFormValues>();
  @Output() cancel = new EventEmitter<void>();

  fuelFormValues: FuelFormValues = new FuelFormValues;

  ngOnInit(): void {
    if (this.initialValues) {
      this.fuelFormValues = { ...this.initialValues };
    }
  }

  closePopup() {
    this.cancel.emit();
  }

  saveFuel(): void {
    this.save.emit(this.fuelFormValues);
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
