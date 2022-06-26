import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UiMaterialModule } from '@client/ui/material';
import { UiComponentsModule } from '@client/ui/components';
import { ReactiveFormsModule } from '@angular/forms';
import { ContainerComponent } from './components/container/container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const authRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    UiMaterialModule,
    UiComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, SignupComponent, ContainerComponent],
})
export class AuthModule {}
