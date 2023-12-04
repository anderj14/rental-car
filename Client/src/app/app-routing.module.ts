import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomePageComponent
  },
  { path: 'test-error', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  {
    path: 'vehicles',
    canActivate: [AuthGuard],
    loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule)
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'reservations',
    canActivate: [AuthGuard],
    loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationModule)
  },
  {
    path: 'invoices',
    canActivate: [AuthGuard],
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule)
  },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // Admin
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./admin-vehicle/admin-vehicle.module').then(m => m.AdminVehicleModule),
    data: { breadcrumb: 'Admin' }
  }, 
  {
    path: 'admin-customer',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./admin-customer/admin-customer.module').then(m => m.AdminCustomerModule),
    data: { breadcrumb: 'Admin' }
  },
  {
    path: 'admin-reservation',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./admin-reservation/admin-reservation.module').then(m => m.AdminReservationModule),
    data: { breadcrumb: 'Admin Reservation' }
  },
  {
    path: 'admin-invoice',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./admin-invoice/admin-invoice.module').then(m => m.AdminInvoiceModule),
    data: { breadcrumb: 'Admin Invoice' }
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
