import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GamesModule } from '../games/games.module';
import { SharedModule } from '../shared/shared.module';
import { ManageModule } from '../manage/manage.module';

import { DashboardComponent } from './components/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    GamesModule,
    SharedModule,
    ManageModule,
  ],
  providers: [],
})
export class DashboardModule {}
