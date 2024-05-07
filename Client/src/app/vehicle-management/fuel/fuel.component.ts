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
  showAddFuelPopup = false;
  showEditFuelPopup: boolean = false;
  editingFuelId: number | null = null;
  editFuelFormValues: FuelFormValues | null = null;

  constructor(private fuelService: FuelService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getFuels();
  }

  getFuels() {
    this.fuelService.getFuels().subscribe({
      next: (response: Fuel[]) => {
        this.fuels = response,
          console.log(this.fuels);
      },
      error: error => console.log(error)
    })
  }

  openAddFuelPopup() {
    this.showAddFuelPopup = true;
    this.showEditFuelPopup = true;
  }

  cancelAddFuelPopup() {
    this.showAddFuelPopup = false;
    this.showEditFuelPopup = false;
  }

  saveFuel(fuelFormValues: FuelFormValues) {
    this.fuelService.createFuel(fuelFormValues).subscribe(
      (response: Fuel) => {
        this.fuels.push(response);
        this.showAddFuelPopup = false;
      },
      error => console.log(error)
    );
  }
  
  editFuel(id: number) {
    const fuelToEdit = this.fuels.find(fuel => fuel.id === id);
    if (fuelToEdit) {
      const fuelFormValues = new FuelFormValues({
        fuelName: fuelToEdit.fuelName
      });

      this.showEditFuelPopup = true;
      this.editingFuelId = id;
      this.editFuelFormValues = fuelFormValues;
    } else {
      console.log('Combustible no encontrado para editar');
    }
  }

  deleteFuel(id: number) {
    this.fuelService.deleteFuel(id).subscribe(
      () => {
        this.fuels = this.fuels.filter(p => p.id !== id);
        console.log(this.fuels);
      }
    );
  }
}
