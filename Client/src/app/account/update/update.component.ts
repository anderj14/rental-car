import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  template: `
    <div class="content d-flex justify-content-flex-start">
      <div class="content-cover">
        <form
          [formGroup]="updateUserForm"
          (ngSubmit)="onSubmit()"
          class="update-user-form"
        >
          <!-- <h2>Update User</h2> -->

          <div class="mb-3">
            <label for="userName" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="userName"
              formControlName="userName"
            />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              formControlName="email"
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              formControlName="password"
            />
          </div>

          <button
            type="submit"
            [disabled]="updateUserForm.invalid"
            class="btn btn-primary"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  `,
  styles: `
    .content {
      margin: 20px 0px;

      input {
        width: 100vh;
        font-size: 18px;
      }

      button {
        font-weight: 400;
        border: none;
        border-radius: 5px;
        align-items: center;
        padding: 5px 0px;
        font-size: 16px;
        width: 100%;
      }

      button {
        color: #000000;
        border: 1px solid #959595;
        background-color: #ffffff;

        &:hover {
          color: #ffffff;
          background-color: #da5b00;
          border: none;
        }
      }
    }
  `,
})
export class UpdateComponent implements OnInit {
  updateUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
    });
  }

  onSubmit(): void {
    if (this.updateUserForm.valid) {
      this.accountService.updateUser(this.updateUserForm.value).subscribe(
        () => {
          console.log('User Update Great!!');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error: ', error);
          this.router.navigate(['/']);
        }
      );
    }
  }
}
