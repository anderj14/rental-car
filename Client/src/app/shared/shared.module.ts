import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager/pager.component';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { RouterModule } from '@angular/router';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PhotoWidgetComponent } from './components/photo-widget/photo-widget.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    PagerComponent,
    PagingHeaderComponent,
    TextInputComponent,
    PhotoWidgetComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    CurrencyMaskModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxGalleryModule,
    TabsModule.forRoot(),
    NgxDropzoneModule,
    ImageCropperModule,
    MaterialModule
  ],
  exports: [
    PagerComponent,
    PagingHeaderComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    CurrencyMaskModule,
    FormsModule,
    ReactiveFormsModule,
    TextInputComponent,
    NgxGalleryModule,
    TabsModule,
    NgxDropzoneModule,
    ImageCropperModule,
    PhotoWidgetComponent
  ]
})
export class SharedModule { }
