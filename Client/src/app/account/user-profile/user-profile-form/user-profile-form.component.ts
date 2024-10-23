import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserProfileFormValues } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrl: './user-profile-form.component.scss',
})
export class UserProfileFormComponent {
  formValues: UserProfileFormValues;

  constructor(
    public dialogRef: MatDialogRef<UserProfileFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userProfile: UserProfileFormValues }
  ) {
    this.formValues = data.userProfile || new UserProfileFormValues();
  }

  onSave() {
    this.dialogRef.close(this.formValues);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
