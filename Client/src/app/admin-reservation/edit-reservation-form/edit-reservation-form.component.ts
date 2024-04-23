import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/models/customers';
import { Insurance } from 'src/app/shared/models/insurance';
import { ReservationFormValues } from 'src/app/shared/models/reservation';
import { IVehicle } from 'src/app/shared/models/vehicles';
import { AdminReservationService } from '../admin-reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, catchError, map, startWith, take } from 'rxjs';

@Component({
  selector: 'app-edit-reservation-form',
  templateUrl: './edit-reservation-form.component.html',
  styleUrls: ['./edit-reservation-form.component.scss']
})
export class EditReservationFormComponent implements OnInit {

  @Input() reservation!: ReservationFormValues;
  @Input() customers!: Customer[];
  @Input() vehicles!: IVehicle[];
  @Input() insurances!: Insurance[];

  customerControl = new FormControl();
  filteredCustomers!: Observable<Customer[]>;

  constructor(
    private adminReservationService: AdminReservationService,
    private route: ActivatedRoute,
    private router: Router) {
    this.reservation = new ReservationFormValues();
  }

  ngOnInit(): void {
    this.filteredCustomers = this.customerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCustomers(value))
    );

    this.adminReservationService.getVehicles().pipe(
      take(1),
      catchError((error: any) => {
        console.error('Error fetching vehicles: ', error);
        return [];
      })
    ).subscribe((response: any) => {
      if ('data' in response) {
        this.vehicles = response.data;
      } else {
        console.error('Invalid response format:', response);
      }
    })
  }

  private _filterCustomers(value: string): Customer[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(
      (customer) => customer.customerName.toLowerCase().includes(filterValue)
    );
  }


  updatePrice(event: any) {
    this.reservation.rentalCost = event;
  }

  onSubmit(reservation: ReservationFormValues) {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedVehicle = { ...this.reservation, ...reservation, rentalCost: +reservation.rentalCost };
      this.adminReservationService.updateReservation(updatedVehicle, +id!).subscribe((response: any) => {
        this.router.navigate(['/admin-reservation']);
      });
    } else {
      const newVehicle = { ...reservation, rentalCost: +reservation.rentalCost };
      this.adminReservationService.createReservation(newVehicle).subscribe((response: any) => {
        this.router.navigate(['/admin-reservation']);
      });
    }
  }
}
