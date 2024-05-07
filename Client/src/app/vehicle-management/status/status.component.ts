import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  showAddStatusPopup = false;
  editStatusFormValues: StatusFormValues | null = null;

  constructor(private statusService: StatusService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getStatuses();
  }

  getStatuses() {
    this.statusService.getStatuses().subscribe({
      next: (response: Status[]) => {
        this.statuses = response;
        console.log(this.statuses);
      },
      error: error => console.log(error)
    })
  }

  openAddStatusPopup() {
    this.showAddStatusPopup = true;
  }

  cancelAddStatusPopup() {
    this.showAddStatusPopup = false;
    this.editStatusFormValues = null;
  }

  saveStatus(statusFormValues: StatusFormValues) {
    if (this.editStatusFormValues) {
      // Edit existing status
      this.statusService.updateStatus(this.editStatusFormValues.id!, statusFormValues).subscribe(
        (response: Status) => {
          const index = this.statuses.findIndex(status => status.id === response.id);
          if (index !== -1) {
            this.statuses[index] = response;
          }
          this.showAddStatusPopup = false;
          this.editStatusFormValues = null;
        },
        error => console.log(error)
      );
    } else {
      // Create new status
      this.statusService.createStatus(statusFormValues).subscribe(
        (response: Status) => {
          this.statuses.push(response);
          this.showAddStatusPopup = false;
        },
        error => console.log(error)
      );
    }
  }
  
  editStatus(id: number) {
    const statusToEdit = this.statuses.find(status => status.id === id);
    if (statusToEdit) {
      const statusFormValues = new StatusFormValues({
        id: statusToEdit.id,
        statusName: statusToEdit.statusName
      });

      this.showAddStatusPopup = true;
      this.editStatusFormValues = statusFormValues;
    } else {
      console.log('Estado no encontrado para editar');
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
