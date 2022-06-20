import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingRoutingModule } from './landing-routing.module';

import { LandingComponent } from './components/landing.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { RequestButtonComponent } from '../shared-components/request-button/request-button.component';

@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    SignupComponent,
    RequestButtonComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LandingRoutingModule,
  ],
})
export class LandingModule {}
