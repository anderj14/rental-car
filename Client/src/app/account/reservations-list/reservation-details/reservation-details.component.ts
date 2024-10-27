import { Component, Inject, OnInit } from '@angular/core';
import { Reservation } from 'src/app/shared/models/reservation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.scss',
})
export class ReservationDetailsComponent implements OnInit {
  reservation!: Reservation;

  constructor(
    public dialogRef: MatDialogRef<ReservationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation }
  ) {
    // Asignamos directamente la reserva pasada
    this.reservation = data.reservation;
  }

  ngOnInit(): void {
    console.log('Reservation Details:', this.reservation);
    console.log('Reservation Details:', this.data);
  }

  deleteReservation() {
    this.dialogRef.close(this.reservation.id);
  }
}
