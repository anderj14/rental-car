import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-photo-widget',
  templateUrl: './photo-widget.component.html',
  styleUrl: './photo-widget.component.scss'
})
export class PhotoWidgetComponent implements OnInit {
  @Output() uploadImageEvent = new EventEmitter<File>();
  @Output() addFile = new EventEmitter();

  files: File[] = [];
  croppedImage: any = '';

  constructor() { }

  ngOnInit(): void {}

  onSelect(event: any) {
    this.files = [];
    this.files.push(...event.addedFiles);
    this.fileChangeEvent(this.files[0]);
  }

  // onUpload() {
  //   const blob = base64ToFile(this.croppedImage);
  //   const file = new File([blob], 'uploaded_image.png', { lastModified: new Date().getTime() });
  //   console.log(file);
  //   this.uploadImageEvent.emit(file);
  // }

  onUpload() {
    console.log(base64ToFile(this.croppedImage));
    this.addFile.emit(base64ToFile(this.croppedImage));
  }

  fileChangeEvent(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.croppedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
