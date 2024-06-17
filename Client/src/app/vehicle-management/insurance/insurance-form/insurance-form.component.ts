import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceFormValues } from 'src/app/shared/models/insurance';

@Component({
  selector: 'app-insurance-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './insurance-form.component.html',
  styleUrl: './insurance-form.component.scss'
})
export class InsuranceFormComponent implements OnInit {

  @Input() showPopup = false;
  @Input() initialValues: InsuranceFormValues | null = null;
  @Output() save = new EventEmitter<InsuranceFormValues>();
  @Output() cancel = new EventEmitter<void>();

  insuranceFormValues: InsuranceFormValues = new InsuranceFormValues();

  constructor() { }

  ngOnInit(): void {
    if (this.initialValues) {
      this.insuranceFormValues = { ...this.initialValues };
    }
  }

  closePopup() {
    this.cancel.emit();
  }

  saveInsurance(): void {
    this.save.emit(this.insuranceFormValues);
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
