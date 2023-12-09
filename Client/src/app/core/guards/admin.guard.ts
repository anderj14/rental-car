import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const AdminGuard = (): Observable<boolean> => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.isAdmin$.pipe(
    map(admin => {
      if (admin) {
        return true;
      } else {
        router.navigateByUrl('/');
        return false;
      }
    })
  );
};