import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { MaterialModule } from '../core';
import { GamesModule } from '../games/games.module';
import { FriendsComponent } from '../friends/friends.component';
import { GroupsComponent } from '../groups/groups.component';
import { ProfileComponent } from '../profile/profile.component';
import { ThemeToggleComponent } from '../profile/components/theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FriendsComponent,
    GroupsComponent,
    ProfileComponent,
    ThemeToggleComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule, GamesModule],
  providers: [],
})
export class DashboardModule {}
