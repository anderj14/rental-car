import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VehicleService } from '../vehicle/vehicle.service';
import { IVehicle } from '../shared/models/vehicles';
import { VehicleParams } from '../shared/models/vehicleParams';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  vehicles!: IVehicle[];
  vehicleParams = new VehicleParams();
  
  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles();

  }

  getVehicles() {
    this.vehicleService.getVehicles(this.vehicleParams).subscribe({
      next: response => {
        this.vehicles = response.data.slice(0, 6);
      },
      error: error => console.log(error)
    });
  }

}
