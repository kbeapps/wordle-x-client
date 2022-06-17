import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from 'src/app/core/components/dashboard.component';
import { LandingComponent } from 'src/app/core/components/landing.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';

import { DashboardGuard } from '../guards/dashboard.guard';
import { LandingGuard } from '../guards/landing.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [LandingGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LandingGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LandingGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
