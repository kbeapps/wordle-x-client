import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UiMaterialModule } from '@client/ui/material';

import { DashboardComponent, ManageComponent } from './components';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, UiMaterialModule],
  declarations: [DashboardComponent, ManageComponent],
})
export class LayoutDashboardModule {}
