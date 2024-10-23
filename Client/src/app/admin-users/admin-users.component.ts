import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { User } from '../shared/models/user';
import { UserParams } from '../shared/models/userParams';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;

  users!: User[];
  currentUser$!: Observable<User | null>;
  isAdmin$!: Observable<boolean>;
  userParams = new UserParams();
  totalCount = 0;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;
    this.getUsers();
  }

  trackById(index: number, user: User) {
    return user.id;
  }

  getUsers() {
    this.accountService.getUsers(this.userParams).subscribe({
      next: (response) => {
        this.users = response.data.map((user) => ({
          ...user,
          userProfile: user.userProfile || {
            firstName: 'N/A',
            lastName: 'N/A',
            phone: 'N/A',
            driverLicense: 'N/A',
          },
          address: user.address || {
            firstAddress: 'N/A',
            city: 'N/A',
            country: 'N/A',
          },
        }));
        this.userParams.pageNumber = response.pageIndex;
        this.userParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  deleteUser(id: string) {
    this.accountService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((p) => p.id !== id);
      console.log(this.users);
    });
  }

  onPageChanged(event: any) {
    const params = this.accountService.getUserParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.accountService.setUserParams(params);
      this.getUsers();
    }
  }

  onSearch() {
    this.userParams.search = this.searchTerm?.nativeElement.value;
    this.userParams.pageNumber = 1;
    this.getUsers();
  }
}
