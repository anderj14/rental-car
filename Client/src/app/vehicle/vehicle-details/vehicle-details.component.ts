import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IVehicle } from 'src/app/shared/models/vehicles';
import { VehicleService } from '../vehicle.service';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { BreadcrumbService } from 'xng-breadcrumb';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle!: IVehicle;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(
    private vehicleService: VehicleService, 
    private activateRoute: ActivatedRoute, 
    private bcService: BreadcrumbService,
    private sessionStorage: SessionStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadVehicle();
  }

  loadVehicle() {
    this.vehicleService.getVehicle(+this.activateRoute.snapshot.paramMap.get('id')!).subscribe(vehicle => {
      this.vehicle = vehicle;
      this.bcService.set('@vehicleDetails', vehicle.vehicleName + " " + vehicle.year);
      this.initializeGallery();
    }, error => {
      console.log(error);
    });
  }

  initializeGallery() {
    this.galleryOptions = [
      {
        width: '1000px',
        height: '700px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Fade,
        imageSize: NgxGalleryImageSize.Contain,
        thumbnailSize: NgxGalleryImageSize.Cover,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.vehicle.photos) {
      imageUrls.push({
        small: photo.pictureUrl,
        medium: photo.pictureUrl,
        big: photo.pictureUrl,
      });
    }

    return imageUrls;
  }

  addReservation() {
    const vehicleId = this.vehicle.id;
    this.sessionStorage.store('vehicleId', vehicleId);
    this.router.navigate(['customer-info']);
  }
}
