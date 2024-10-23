import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { User, UserProfile, UserProfileFormValues } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile = {
    firstName: 'N/A',
    lastName: 'N/A',
    phone: 'N/A',
    driverLicense: 'N/A',
    identificationNumber: 'N/A',
    dateOfBirth: 'N/A',
    appUserId: '',
  };
  currentUser$!: Observable<User | null>;

  constructor(
    public accountService: AccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.getUserProfile();
  }

  getUserProfile() {
    this.accountService.getUserProfile().subscribe({
      next: (response: UserProfile) => {
        this.userProfile = response || this.userProfile;
      },
      error: (error) =>
        console.error('Error al obtener el perfil de usuario:', error),
    });
  }

  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(UserProfileFormComponent, {
      width: '600px',
      data: { userProfile: this.userProfile },
    });

    dialogRef.afterClosed().subscribe((result: UserProfileFormValues) => {
      if (result) {
        this.saveUserProfile(result);
      }
    });
  }

  saveUserProfile(userProfileFormValues: UserProfileFormValues) {
    if (!this.userProfile.appUserId) {
      this.accountService.createUserProfile(userProfileFormValues).subscribe(
        (response: UserProfile) => {
          this.userProfile = response;
        },
        (error) => console.log(error)
      );
    } else {
      this.accountService.updateUserProfile(userProfileFormValues).subscribe(
        () => {
          console.log('User profile updated successfully!');
          this.getUserProfile();
        },
        (error) => {
          console.error('Error updating user profile:', error);
        }
      );
    }
  }
}
