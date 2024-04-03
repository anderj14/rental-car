export interface Customer {
  id: number
  customerName: string
  email: string
  phone: string
  driverLicense: string
  dob: string
  address: string
  secondAddress: string
  city: string
  state: string
  zip: string
  country: string
}

export interface ICustomerToCreate {
  customerName: string
  email: string
  phone: string
  driverLicense: string
  dob: string
  address: string
  secondAddress: string
  city: string
  state: string
  zip: string
  country: string
}

export class CustomerFormValues implements ICustomerToCreate {
  customerName = '';
  email = '';
  phone = '';
  driverLicense = '';
  dob = '';
  address = '';
  secondAddress = '';
  city = '';
  state = '';
  zip = '';
  country = '';

  constructor(init?: CustomerFormValues) {
    Object.assign(this, init);
  }
}