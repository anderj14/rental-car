export interface Customer {
  id: number
  customerName: string
  email: string
  phone: string
  driverLicense: string
  address: string
}

export interface ICustomerToCreate {
  customerName: string
  email: string
  phone: string
  driverLicense: string
  address: string
}

export class CustomerFormValues implements ICustomerToCreate {
  customerName = '';
  email = '';
  phone = '';
  driverLicense = '';
  address = '';

  constructor(init?: CustomerFormValues) {
    Object.assign(this, init);
  }
}