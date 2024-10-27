import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/shared/models/reservation';
import { ReservationParams } from 'src/app/shared/models/reservationParams';
import { User } from 'src/app/shared/models/user';
import { ReservationService } from 'src/app/vehicle/reservation-info-form/reservation.service';
import { AccountService } from '../account.service';
import { AdminReservationService } from 'src/app/admin-reservation/admin-reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.scss',
})
export class ReservationsListComponent implements OnInit {
  reservations!: Reservation[];
  reservation!: Reservation;
  totalCount!: number;
  reservationParams!: ReservationParams;
  currentUser$!: Observable<User | null>;

  sortOption = [
    { name: 'Reservation Number', value: 'reservationNumber' },
    { name: 'Date: Asc To Desc', value: 'dateAsc' },
    { name: 'Date: Desc To Asc', value: 'dateDesc' },
  ];

  constructor(
    private reservationService: ReservationService,
    private accountService: AccountService,
    private adminReservationService: AdminReservationService,
    public dialog: MatDialog
  ) {
    this.reservationParams = this.reservationService.getReservationParams();
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.getReservation();
  }

  getReservation() {
    this.reservationService
      .getReservationsByUser(this.reservationParams)
      .subscribe({
        next: (response) => {
          this.reservations = response.data;
          this.totalCount = response.count;
        },
        error: (error) => console.log(error),
      });
  }

  onPageChanged(event: any) {
    const params = this.reservationService.getReservationParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.reservationService.setReservationParams(params);
      this.getReservation();
    }
  }

  deleteReservation(id: number) {
    this.adminReservationService.deleteReservation(id).subscribe(() => {
      this.reservations = this.reservations.filter((p) => p.id !== id);
      this.totalCount--;
    });
  }

  onSortSelected(event: any) {
    this.reservationParams.sort = event.target.value;
    this.getReservation();
  }

  openEditReservationDetails(reservation: Reservation): void {
    const dialogRef = this.dialog.open(ReservationDetailsComponent, {
      width: '800px',
      data: { reservation }
    });
  
    dialogRef.afterClosed().subscribe((result: number) => {
      if (result) {
        this.deleteReservation(result);
      }
    });
  }
  
}
