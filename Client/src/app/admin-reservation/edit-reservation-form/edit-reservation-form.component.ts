import { Component, Input } from '@angular/core';
import { Customer } from 'src/app/shared/models/customers';
import { Insurance } from 'src/app/shared/models/insurance';
import { ReservationFormValues } from 'src/app/shared/models/reservation';
import { Vehicle } from 'src/app/shared/models/vehicles';
import { AdminReservationService } from '../admin-reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-reservation-form',
  templateUrl: './edit-reservation-form.component.html',
  styleUrls: ['./edit-reservation-form.component.scss']
})
export class EditReservationFormComponent {

  @Input() reservation!: ReservationFormValues;
  @Input() customers!: Customer[];
  @Input() vehicles!: Vehicle[];
  @Input() insurances!: Insurance[];

  constructor(
    private adminReservationService: AdminReservationService,
    private route: ActivatedRoute,
    private router: Router) {
    this.reservation = new ReservationFormValues();
  }

  ngOnInit(): void {
  }


  updatePrice(event: any) {
    this.reservation.rentalCost = event;
  }

  onSubmit(reservation: ReservationFormValues) {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.route.snapshot.url[0].path === 'edit-reservation') {
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
