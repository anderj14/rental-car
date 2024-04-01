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

  @ViewChild('search') searchTerm?: ElementRef;
  vehicles!: IVehicle[];
  vehicleParams = new VehicleParams();
  sortOption = [
    { name: 'Alphabetical', value: 'vehicleName' },
    { name: 'Price: Low To High', value: 'priceAsc' },
    { name: 'Price: High To Low', value: 'priceDesc' },
  ];
  totalCount = 0;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles();

  }

  getVehicles() {
    this.vehicleService.getVehicles(this.vehicleParams).subscribe({
      next: response => {
        this.vehicles = response.data;
        this.vehicleParams.pageNumber = response.pageIndex;
        this.vehicleParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    });
  }

}
