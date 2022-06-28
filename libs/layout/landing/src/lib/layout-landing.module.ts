import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@client/shared';
import { LandingRoutingModule } from './landing-routing.module';

import { LandingComponent, LandingPageComponent } from './components';

@NgModule({
  imports: [CommonModule, LandingRoutingModule, MaterialModule],
  declarations: [LandingComponent, LandingPageComponent],
})
export class LayoutLandingModule {}
