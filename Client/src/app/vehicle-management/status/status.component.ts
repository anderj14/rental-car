import { Component } from '@angular/core';
import { Status, StatusFormValues } from 'src/app/shared/models/status';
import { StatusService } from './status.service';
import { StatusFormComponent } from './status-form/status-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [FormsModule, CommonModule, StatusFormComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {

  statuses: Status[] = [];
  showStatusPopup = false;
  editingStatusId: number | null = null;
  editStatusFormValues: StatusFormValues = new StatusFormValues();

  constructor(private statusService: StatusService) { }

  ngOnInit(): void {
    this.getStatuses();
  }

  getStatuses() {
    this.statusService.getStatuses().subscribe({
      next: (response: Status[]) => {
        this.statuses = response;
      },
      error: error => console.log(error)
    })
  }

  openStatusPopup(id?: number) {
    if (id) {
      const statusToEdit = this.statuses.find(status => status.id === id);
      if (statusToEdit) {
        this.editStatusFormValues = new StatusFormValues({
          statusName: statusToEdit.statusName
        });
        this.editingStatusId = id;
      }
    } else {
      this.editStatusFormValues = new StatusFormValues();
      this.editingStatusId = null;
    }
    this.showStatusPopup = true;
  }

  cancelAddStatusPopup() {
    this.showStatusPopup = false;
  }

  saveStatus(statusFormValues: StatusFormValues) {
    if (this.editingStatusId == null) {
      this.statusService.createStatus(statusFormValues).subscribe(
        (response: Status) => {
          this.statuses.push(response);
          this.showStatusPopup = false;
        },
        error => console.log(error)
      );
    } else {
      this.statusService.updateStatus(this.editingStatusId, statusFormValues).subscribe((response: Status) => {
        const index = this.statuses.findIndex(b => b.id === response.id);
        if (index !== -1) {
          this.statuses[index] = response;
        }
        this.showStatusPopup = false;
        this.editingStatusId = null;
      },
        error => console.log(error)
      );
    }

  }

  deleteStatus(id: number) {
    this.statusService.deleteStatus(id).subscribe(
      () => {
        this.statuses = this.statuses.filter(status => status.id !== id);
      },
      error => console.log(error)
    );
  }
}
