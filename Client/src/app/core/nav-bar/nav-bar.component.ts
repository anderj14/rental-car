import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  currentUser$!: Observable<User | null>;
  isAdmin$!: Observable<boolean>;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto'; // prevent body scroll when menu is open
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';
  }
}
