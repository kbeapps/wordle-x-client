import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FriendsComponent } from './components/friends/friends.component';

export const friendsRoutes: Route[] = [
  {
    path: '',
    component: FriendsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FriendsComponent],
})
export class FriendsModule {}
