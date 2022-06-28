import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LandingComponent } from './components/landing.component';

export const layoutLandingRoutes: Route[] = [
  { path: '', component: LandingComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LandingComponent],
})
export class LayoutLandingModule {}
