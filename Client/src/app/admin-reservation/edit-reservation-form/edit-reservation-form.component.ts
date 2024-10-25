import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/models/customers';
import { Insurance } from 'src/app/shared/models/insurance';
import { ReservationFormValues } from 'src/app/shared/models/reservation';
import { IVehicle } from 'src/app/shared/models/vehicles';
import { AdminReservationService } from '../admin-reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-reservation-form',
  templateUrl: './edit-reservation-form.component.html',
  styleUrls: ['./edit-reservation-form.component.scss']
})
export class EditReservationFormComponent implements OnInit {

  @Input() reservation!: ReservationFormValues;
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
  }

  onSubmit(reservation: ReservationFormValues) {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedVehicle = { ...this.reservation, ...reservation };
      this.adminReservationService.updateReservation(updatedVehicle, +id!).subscribe((response: any) => {
        this.router.navigate(['/admin-reservation']);
      });
    } else {
      const newVehicle = { ...reservation };
      this.adminReservationService.createReservation(newVehicle).subscribe((response: any) => {
        console.log(newVehicle);
        this.router.navigate(['/admin-reservation']);
      });
    }
  }
}
