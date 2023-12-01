import { Customer } from "./customers";
import { Insurance } from "./insurance";
import { Vehicle } from "./vehicles";

export interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
  days: number;
  rentalCost: number;
  customerId: number;
  vehicleId: number;
  insuranceId: number;
  customer?: Customer;
  vehicle?: Vehicle;
  insurance?: Insurance;
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
