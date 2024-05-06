import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UpdateComponent } from './update/update.component';
import { MaterialModule } from '../material/material.module';
import { AccountComponent } from './account.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UpdateComponent,
    AccountComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AccountModule { }
