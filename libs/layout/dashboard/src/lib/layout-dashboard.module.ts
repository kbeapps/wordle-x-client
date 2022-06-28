import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UiMaterialModule } from '@client/ui/material';

import { DashboardComponent } from './components/dashboard.component';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, UiMaterialModule],
  declarations: [DashboardComponent],
})
export class LayoutDashboardModule {}
