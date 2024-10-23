export interface User {
  id: string;
  email: string;
  userName: string;
  token: string;
  userProfile: UserProfile;
  address: Address;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  identificationNumber: string;
  driverLicense: string;
  phone: string;
  dateOfBirth: string;
  appUserId: string;
}


export interface IUserProfileToCreate {
  firstName: string;
  lastName: string;
  identificationNumber: string;
  driverLicense: string;
  phone: string;
  dateOfBirth: string;
}

export class UserProfileFormValues implements IUserProfileToCreate {
  firstName = '';
  lastName = '';
  identificationNumber = '';
  driverLicense = '';
  phone = '';
  dateOfBirth = '';

  constructor(init?: UserProfileFormValues) {
    Object.assign(this, init);
  }
}

export interface Address {
  firstAddress: string;
  secondAddress: string;
  country: string;
  city: string;
  zipCode: string;
  appUserId: string;
}

export interface IAddressToCreate {
  firstAddress: string;
  secondAddress: string;
  country: string;
  city: string;
  zipCode: string;
}

export class AddressFormValues implements IAddressToCreate {
  firstAddress = '';
  secondAddress = '';
  country = '';
  city = '';
  zipCode = '';

  constructor(init?: AddressFormValues) {
    Object.assign(this, init);
  }
}
