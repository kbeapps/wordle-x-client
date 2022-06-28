import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMaterialModule } from '@client/ui/material';
import { LandingRoutingModule } from './landing-routing.module';

import { LandingComponent, LandingPageComponent } from './components';

@NgModule({
  imports: [CommonModule, LandingRoutingModule, UiMaterialModule],
  declarations: [LandingComponent, LandingPageComponent],
})
export class LayoutLandingModule {}
