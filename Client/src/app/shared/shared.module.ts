import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager/pager.component';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';



@NgModule({
  declarations: [
    PagerComponent,
    PagingHeaderComponent,
    TextInputComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    PagerComponent,
    PagingHeaderComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent
  ]
})
export class SharedModule { }
