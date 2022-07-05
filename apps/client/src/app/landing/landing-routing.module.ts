import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingGuard } from './guards/landing.guard';
import { LandingComponent } from './components/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [LandingGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
