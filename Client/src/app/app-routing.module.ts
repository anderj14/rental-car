import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { ReservationInfoComponent } from './reservation-info/reservation-info.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { VehicleManagementComponent } from './vehicle-management/vehicle-management.component';

const routes: Routes = [
  {
    path: '',
    title: "Home",
    component: HomePageComponent,
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'contact',
    title: "Contact",
    component: ContactComponent
  },
  { path: 'test-error', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  {
    path: 'vehicles',
    title: "Vehicles",
    // canActivate: [AuthGuard],
    loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule)
  },
  {
    path: 'customer-info',
    title: "Customer Info",
    component: CustomerInfoComponent
  },
  {
    path: 'reservation-info',
    title: "Reservation Info",
    component: ReservationInfoComponent
  },
  {
    path: 'about-us',
    title: "About Us",
    component: AboutUsComponent
  },
  {
    path: 'invoices',
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule)
  },
  {
    path: 'vehicle-management',
    canActivate: [AuthGuard],
    component: VehicleManagementComponent
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  // Admin
  {
    path: 'dashboard',
    title: "Dashboard",
    canActivate: [AuthGuard],
    component: DashboardComponent,
    data: { breadcrumb: 'Dashboard' }
  },
  {
    path: 'admin-vehicle',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin-vehicle/admin-vehicle.module').then(m => m.AdminVehicleModule),
    data: { breadcrumb: 'Admin Vehicles' }
  },
  {
    path: 'admin-customer',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin-customer/admin-customer.module').then(m => m.AdminCustomerModule),
    data: { breadcrumb: 'Admin customers' }
  },
  {
    path: 'admin-reservation',
    loadChildren: () => import('./admin-reservation/admin-reservation.module').then(m => m.AdminReservationModule),
    data: { breadcrumb: 'Admin Reservations' }
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
