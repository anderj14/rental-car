import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IVehicle } from 'src/app/shared/models/vehicles';
import { VehicleService } from '../vehicle.service';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryImageSize,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { BreadcrumbService } from 'xng-breadcrumb';
import { MatDialog } from '@angular/material/dialog';
import {
  Reservation,
  ReservationFormValues,
} from 'src/app/shared/models/reservation';
import { AdminReservationService } from 'src/app/admin-reservation/admin-reservation.service';
import { ReservationInfoFormComponent } from '../reservation-info-form/reservation-info-form.component';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss'],
})
export class VehicleDetailsComponent implements OnInit {
  vehicle!: IVehicle;
  reservation!: Reservation;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(
    private vehicleService: VehicleService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    public dialog: MatDialog,
    private adminReservationService: AdminReservationService
  ) {}

  ngOnInit(): void {
    this.loadVehicle();
  }

  loadVehicle() {
    this.vehicleService
      .getVehicle(+this.activateRoute.snapshot.paramMap.get('id')!)
      .subscribe(
        (vehicle) => {
          this.vehicle = vehicle;
          this.bcService.set(
            '@vehicleDetails',
            vehicle.vehicleName + ' ' + vehicle.year
          );
          this.initializeGallery();
        },
        (error) => {
          console.log(error);
        }
      );
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
        preview: false,
      },
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

  openReservationDialog(): void {
    const dialogRef = this.dialog.open(ReservationInfoFormComponent, {
      width: '600px',
      data: { vehicle: this.vehicle },
    });

    dialogRef.afterClosed().subscribe((result: ReservationFormValues) => {
      if (result) {
        console.log('Completed reserve:', result);
      }
    });
  }

}
