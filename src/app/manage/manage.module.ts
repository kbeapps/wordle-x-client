import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core';
import { SharedModule } from '../shared/shared.module';

import { FriendsComponent } from './friends/friends.component';
import { GroupsComponent } from './groups/groups.component';
import { ProfileComponent } from './profile/profile.component';
import { ThemeToggleComponent } from './profile/components/theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    FriendsComponent,
    GroupsComponent,
    ProfileComponent,
    ThemeToggleComponent,
  ],
  imports: [CommonModule, MaterialModule, SharedModule],
  exports: [FriendsComponent, GroupsComponent, ProfileComponent],
})
export class ManageModule {}
