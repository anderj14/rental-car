import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
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
