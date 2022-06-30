import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent, LandingPageComponent } from './components';
import { LandingGuard } from './guards/landing.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [LandingGuard],
    children: [
      { path: '', component: LandingPageComponent },
      {
        path: 'auth',
        loadChildren: () => import('@client/auth').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
