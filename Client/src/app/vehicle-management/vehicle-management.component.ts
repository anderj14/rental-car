import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { User } from '../shared/models/user';
import { FuelComponent } from './fuel/fuel.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrandComponent } from './brand/brand.component';

@Component({
  selector: 'app-vehicle-management',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    FuelComponent,
    InsuranceComponent,
    VehicleTypeComponent,
    BrandComponent,
    NgbModule,
  ],
  templateUrl: './vehicle-management.component.html',
  styleUrl: './vehicle-management.component.scss',
})
export class VehicleManagementComponent implements OnInit {
  currentUser$!: Observable<User | null>;
  isAdmin$!: Observable<boolean>;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;
  }
}
