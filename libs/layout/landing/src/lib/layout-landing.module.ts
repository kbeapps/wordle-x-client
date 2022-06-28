import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LandingComponent } from './landing.component';
import { UiMaterialModule } from '@client/ui/material';
import { LandingPageComponent } from './landing-page/landing-page.component';

const layoutLandingRoutes: Route[] = [
  {
    path: '',
    component: LandingComponent,
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
  imports: [
    CommonModule,
    RouterModule.forChild(layoutLandingRoutes),
    UiMaterialModule,
  ],
  declarations: [LandingComponent, LandingPageComponent],
})
export class LayoutLandingModule {}
