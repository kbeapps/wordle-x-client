import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingGuard } from './landing/guards/landing.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/landing/landing.module').then((m) => m.LandingModule),
    canActivate: [LandingGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
