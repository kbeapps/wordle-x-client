import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '@client/shared';

import { DashboardComponent, ManageComponent } from './components';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, MaterialModule],
  declarations: [DashboardComponent, ManageComponent],
})
export class LayoutDashboardModule {}
