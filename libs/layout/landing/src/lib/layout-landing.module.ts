import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@client/shared';
import { LandingRoutingModule } from './landing-routing.module';

import { HeaderComponent } from './components/header/header.component';
import { LandingComponent, LandingPageComponent } from './components';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [CommonModule, LandingRoutingModule, SharedModule],
  declarations: [
    LandingComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class LayoutLandingModule {}
