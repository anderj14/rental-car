import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  template: `
    <div class="content d-flex justify-content-flex-start">
      <div class="content-cover">
        <form [formGroup]="updateUserForm" (ngSubmit)="onSubmit()" class="update-user-form">
            <h2>Update User</h2>

            <div class="mb-3">
                <label for="displayName" class="form-label">Display Name</label>
                <input type="text" class="form-control" id="displayName" formControlName="displayName">
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" formControlName="email">
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" formControlName="password">
            </div>

            <button type="submit" [disabled]="updateUserForm.invalid" class="btn btn-primary">Update</button>
        </form>
      </div>
    </div>  
  `,
  styles: `
    .content {
      margin: 20px 0 10px 5px;

      h2 {
        margin-bottom: 20px;
        font-size: 25px;
      }

      input {
        width: 320px;
        font-size: 18px;
      }
    }
  `
})

export class UpdateComponent implements OnInit {

  updateUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)]
    });
  }

  onSubmit(): void {
    if (this.updateUserForm.valid) {
      this.accountService.updateUser(this.updateUserForm.value).subscribe(
        () => {
          console.log('User Update Great!!');
          this.router.navigate(['/']);

        },
        error => {
          console.error('Error: ', error);
          this.router.navigate(['/']);
        }
      );
    }
  }
}
