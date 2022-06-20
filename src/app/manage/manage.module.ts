import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core';
import { SharedModule } from '../shared/shared.module';
import { ManageRoutingModule } from './manage-routing.module';

import { FriendsComponent } from './friends/friends.component';
import { GroupsComponent } from './groups/groups.component';
import { ProfileComponent } from './profile/profile.component';
import { ThemeToggleComponent } from './profile/components/theme-toggle/theme-toggle.component';
import { ManageComponent } from './components/manage/manage.component';

@NgModule({
  declarations: [
    FriendsComponent,
    GroupsComponent,
    ProfileComponent,
    ThemeToggleComponent,
    ManageComponent,
  ],
  imports: [CommonModule, MaterialModule, SharedModule, ManageRoutingModule],
  exports: [FriendsComponent, GroupsComponent, ProfileComponent],
})
export class ManageModule {}
