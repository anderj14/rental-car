import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrandFormValues } from 'src/app/shared/models/brand';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit{

  @Input() showPopup = false;
  @Input() initialValues: BrandFormValues | null = null;
  @Output() save = new EventEmitter<BrandFormValues>();
  @Output() cancel = new EventEmitter<void>();

  brandFormValues: BrandFormValues = new BrandFormValues();

  constructor() { }

  ngOnInit(): void {
    if (this.initialValues) {
      this.brandFormValues = { ...this.initialValues };
    }
  }

  closePopup() {
    this.cancel.emit();
  }

  saveBrand(): void {
    this.save.emit(this.brandFormValues);
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
