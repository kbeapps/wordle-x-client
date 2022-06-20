import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GamesModule } from '../games/games.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './components/dashboard.component';
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
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    GamesModule,
    SharedModule,
  ],
  providers: [],
})
export class DashboardModule {}
