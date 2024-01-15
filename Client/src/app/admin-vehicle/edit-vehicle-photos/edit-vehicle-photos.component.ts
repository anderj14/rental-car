import { Component, Input, OnInit } from '@angular/core';
import { IVehicle } from 'src/app/shared/models/vehicles';
import { EditVehicleService } from '../edit-vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-edit-vehicle-photos',
  templateUrl: './edit-vehicle-photos.component.html',
  styleUrl: './edit-vehicle-photos.component.scss'
})
export class EditVehiclePhotosComponent implements OnInit {

  @Input() vehicle!: IVehicle;
  progress = 0;
  addPhotoMode = false;

  constructor(private adminVehicleService: EditVehicleService, private toast: ToastrService) { }

  addPhotoModeToggle() {
    this.addPhotoMode = !this.addPhotoMode;
  }

  ngOnInit(): void {

  }

  uploadFile(file: File) {
    this.adminVehicleService.uploadImage(file, this.vehicle.id).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total! * 100);
          break;
        case HttpEventType.Response:
          this.vehicle = event.body;
          setTimeout(() => {
            this.progress = 0;
            this.addPhotoMode = false;
          }, 1500);
      }
    }, error => {
      if (error.errors) {
        this.toast.error(error.errors[0]);
      } else {
        this.toast.error('Problem uploading image');
      }
      this.progress = 0;
    })
  }

  deletePhoto(photoId: number) {
    this.adminVehicleService.deleteVehiclePhoto(photoId, this.vehicle.id).subscribe(() => {
      const photoIndex = this.vehicle.photos.findIndex(x => x.id === photoId);
      this.vehicle.photos.splice(photoIndex, 1);
    }, error => {
      this.toast.error('Problem deleting photo');
      console.log(error);
    });
  }

  setMainPhoto(photoId: number) {
    this.adminVehicleService.setMainPhoto(photoId, this.vehicle.id).subscribe((vehicle: IVehicle) => {
      this.vehicle = vehicle;
    });
  }

}
