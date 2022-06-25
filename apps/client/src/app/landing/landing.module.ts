import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

import { LandingComponent } from './components/landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    LandingRoutingModule,
    SharedModule,
    AuthModule,
  ],
})
export class LandingModule {}
