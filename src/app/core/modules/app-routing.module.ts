import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { LandingComponent } from 'src/app/landing/landing.component';
import { LoginComponent } from 'src/app/landing/login/login.component';
import { SignupComponent } from 'src/app/landing/signup/signup.component';

import { DashboardGuard } from '../guards/dashboard.guard';
import { LandingGuard } from '../guards/landing.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    // canActivate: [LandingGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [DashboardGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [LandingGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    // canActivate: [LandingGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
