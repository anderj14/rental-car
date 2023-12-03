export interface Reservation {
  id: number;
  reservationNumber: string;
  startDate: string;
  endDate: string;
  days: number;
  rentalCost: number;
  customer: string;
  vehicle: string;
  insurance: string;
}

export interface IReservationToCreate {
  startDate: string;
  endDate: string;
  days: number;
  rentalCost: number;
  customerId: number;
  vehicleId: number;
  insuranceId: number;
}

export class ReservationFormValues implements IReservationToCreate {
  startDate = '';
  endDate = '';
  days = 0;
  rentalCost = 0;
  customerId!: number;
  vehicleId!: number;
  insuranceId!: number;

  constructor(init?: ReservationFormValues) {
    Object.assign(this, init);
  }
}
