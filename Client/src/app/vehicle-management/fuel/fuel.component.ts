import { Component, OnInit } from '@angular/core';
import { FuelService } from './fuel.service';
import { Fuel, FuelFormValues } from 'src/app/shared/models/fuel';
import { FuelFormComponent } from './fuel-form/fuel-form.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fuel',
  standalone: true,
  imports: [FuelFormComponent, CommonModule, NgbModule],
  templateUrl: './fuel.component.html',
  styleUrl: './fuel.component.scss'
})
export class FuelComponent implements OnInit {

  fuels: Fuel[] = [];
  showFuelPopup = false;
  editingFuelId: number | null = null;
  editFuelFormValues: FuelFormValues = new FuelFormValues();

  constructor(private fuelService: FuelService) { }

  ngOnInit(): void {
    this.getFuels();
  }

  getFuels() {
    this.fuelService.getFuels().subscribe({
      next: (response: Fuel[]) => {
        this.fuels = response;
      },
      error: error => console.log(error)
    })
  }

  openFuelPopup(id?: number) {
    if (id) {
      const fuelToEdit = this.fuels.find(fuel => fuel.id === id);
      if (fuelToEdit) {
        this.editFuelFormValues = new FuelFormValues({
          fuelName: this.editFuelFormValues.fuelName
        });
        this.editingFuelId = id;
      }
    } else {
      this.editFuelFormValues = new FuelFormValues();
      this.editingFuelId = null;
    }
    this.showFuelPopup = true;
  }

  cancelAddFuelPopup() {
    this.showFuelPopup = false;
  }

  saveFuel(brandFormValues: FuelFormValues) {
    if (this.editingFuelId === null) {
      this.fuelService.createFuel(brandFormValues).subscribe(
        (response: Fuel) => {
          this.fuels.push(response);
          this.showFuelPopup = false;
        },
        error => console.log(error)
      );
    } else {
      this.fuelService.updateFuel(this.editingFuelId, brandFormValues).subscribe(
        (response: Fuel) => {
          const index = this.fuels.findIndex(b => b.id === response.id);
          if (index !== -1) {
            this.fuels[index] = response;
          }
          this.showFuelPopup = false;
          this.editingFuelId = null;
        },
        error => console.log(error)
      );
    }
  }

  deleteFuel(id: number) {
    this.fuelService.deleteFuel(id).subscribe(
      () => {
        this.fuels = this.fuels.filter(p => p.id !== id);
      },
      error => console.log(error)
    );
  }
}
