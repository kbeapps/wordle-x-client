import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {} from './components';

import { LoginComponent, SignupComponent } from './components';

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'signup', component: SignupComponent, title: 'Signup' },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
