import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { VehicleManagementComponent } from './vehicle-management/vehicle-management.component';
import { ReservationInfoComponent } from './core/reservation-info/reservation-info.component';

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
    loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule)
  },
  {
    path: 'about-us',
    title: "About Us",
    component: AboutUsComponent
  },
  {
    path: 'vehicle-management',
    canActivate: [AuthGuard, AdminGuard],
    component: VehicleManagementComponent
  },
  {
    path: 'reservation-info/:id',
    canActivate: [AuthGuard],
    component: ReservationInfoComponent
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  // Admin
  {
    path: 'dashboard',
    title: "Dashboard",
    canActivate: [AuthGuard, AdminGuard],
    component: DashboardComponent,
    data: { breadcrumb: 'Dashboard' }
  },
  {
    path: 'admin-vehicle',
    title: "Admin Vehicle",
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./admin-vehicle/admin-vehicle.module').then(m => m.AdminVehicleModule),
    data: { breadcrumb: 'Admin Vehicles' }
  },
  {
    path: 'admin-users',
    title: "Admin User",
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./admin-users/admin-users.module').then(m => m.AdminUsersModule),
    data: { breadcrumb: 'Admin users' }
  },
  {
    path: 'admin-reservation',
    title: "Admin Reservation",
    canActivate: [AuthGuard, AdminGuard],
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
