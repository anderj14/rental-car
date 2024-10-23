import { Component, OnInit } from '@angular/core';
import { Address, AddressFormValues } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.scss',
})
export class UserAddressComponent implements OnInit {
  address!: Address;
  editAddressFormValues: AddressFormValues = new AddressFormValues();

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getUserAddress().subscribe(
      (response: Address) => {
        if (response) {
          this.address = response;
          this.editAddressFormValues = { ...response };
        }
      },
      (error) => console.log(error)
    );
  }

  saveAddress(addressFormValues: AddressFormValues) {
    if (this.editAddressFormValues == null) {
      this.accountService.createUserAddress(addressFormValues).subscribe(
        (response: Address) => {
          this.address == response;
        },
        (error) => console.log(error)
      );
    } else {
      this.accountService.updateUserAddress(addressFormValues).subscribe(
        () => {
          console.log('Address Update Great!!');
        },
        (error) => {
          console.error('Error: ', error);
        }
      );
    }
  }
}
