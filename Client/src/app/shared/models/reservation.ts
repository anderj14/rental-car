export interface Reservation {
  id: number;
  reservationNumber: string;
  startDate: string;
  endDate: string;
  days: number;
  rentalCost: number;
  vehicle: string;
  insurance: string;
  status: string;
  appUserId: string;
  vehicleYear: number;
  userFirstName: string;
  userLastName: string;
  phone: string;
  identificationNumber: string;
  driverLicense: string;
  firstAddress: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface IReservationToCreate {
  startDate: string;
  endDate: string;
  vehicleId: number;
  insuranceId: number;
}

export class ReservationFormValues implements IReservationToCreate {
  startDate = '';
  endDate = '';
  vehicleId!: number;
  insuranceId!: number;

  constructor(init?: ReservationFormValues) {
    Object.assign(this, init);
  }
}
