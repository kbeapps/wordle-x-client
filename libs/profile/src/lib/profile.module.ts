import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
