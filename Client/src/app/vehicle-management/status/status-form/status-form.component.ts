import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusFormValues } from 'src/app/shared/models/status';

@Component({
  selector: 'app-status-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './status-form.component.html',
  styleUrl: './status-form.component.scss'
})
export class StatusFormComponent implements OnInit {
  @Input() showPopup = false;
  @Input() initialValues: StatusFormValues | null = null;
  @Output() save = new EventEmitter<StatusFormValues>();
  @Output() cancel = new EventEmitter<void>();

  statusFormValues: StatusFormValues = new StatusFormValues();

  constructor() { }

  ngOnInit(): void {
    if (this.initialValues) {
      this.statusFormValues = { ...this.initialValues };
    }
  }

  closePopup() {
    this.cancel.emit();
  }

  saveStatus(): void {
    this.save.emit(this.statusFormValues);
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
