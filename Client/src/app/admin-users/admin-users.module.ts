import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin-users.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { AdminUsersRoutingModule } from './admin-users-routing.module';


@NgModule({
  declarations: [
    AdminUsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminUsersRoutingModule,
    MaterialModule,
    BreadcrumbComponent
  ]
})
export class AdminUsersModule { }
