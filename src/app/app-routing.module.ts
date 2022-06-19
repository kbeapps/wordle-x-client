import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from 'src/app/core/components/landing.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';

import { LandingGuard } from './core/guards/landing.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [LandingGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
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
