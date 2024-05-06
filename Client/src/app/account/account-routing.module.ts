import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AdminGuard } from '../core/guards/admin.guard';
import { UpdateComponent } from './update/update.component';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'register',
  //   canActivate: [AuthGuard, AdminGuard],
  //   component: RegisterComponent
  // },
  // { 
  //   path: 'update-user', 
  //   component: UpdateComponent 
  // }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
