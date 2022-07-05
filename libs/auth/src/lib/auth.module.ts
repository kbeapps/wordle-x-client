import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@client/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './components/card/card.component';
import { LoginComponent, SignupComponent } from './components';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule],
  declarations: [LoginComponent, SignupComponent, CardComponent],
})
export class AuthModule {}
