import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '@client/shared';
import { AuthModule } from '@client/auth/src';

import { DashboardComponent, ManageComponent } from './components';

@NgModule({
  imports: [CommonModule, AuthModule, DashboardRoutingModule, SharedModule],
  declarations: [DashboardComponent, ManageComponent],
})
export class LayoutDashboardModule {}
