import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/shared/models/reservation';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/account/account.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ReservationService } from 'src/app/reservation-info/reservation.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export default class ReservationDetailsComponent implements OnInit {
  reservation!: Reservation;

  constructor(
    private reservationService: ReservationService,
    private activateRoute: ActivatedRoute,
    public accountService: AccountService,
    private bcService: BreadcrumbService,
  ) { }

  // currentUser$!: Observable<User | null>;
  // isAdmin$!: Observable<boolean>;

  ngOnInit(): void {
    // this.currentUser$ = this.accountService.currentUser$;
    // this.isAdmin$ = this.accountService.isAdmin$;

    this.getReservation();
  }

  getReservation() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) this.reservationService.getReservation(+id).subscribe({
      next: reservation => {
        this.reservation = reservation;
        this.bcService.set('@reservationDetails', reservation.reservationNumber + " | " + reservation.customer);
      },
      error: error => console.log(error)
    });
  }
}
