import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { User } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  // standalone: true,
  // imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  users!: User[];

  currentUser$!: Observable<User | null>;
  isAdmin$!: Observable<boolean>;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;
    this.getUsers();
  }

  getUsers() {
    this.accountService.getUsers().subscribe({
      next: (response: User[]) => {
        this.users = response,
          console.log(this.users);
      },
      error: error => console.log(error)
    })
  }

  deleteCustomer(id: string) {
    this.accountService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(p => p.id !== id);
        console.log(this.users);
      }
    );
  }

}
