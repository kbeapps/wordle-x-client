import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './guards/dashboard.guard';
import { DashboardComponent } from './components/dashboard.component';
import { FriendsComponent } from '../manage/friends/friends.component';
import { GamesComponent } from '../games/components/games.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    children: [
      {
        path: 'play',
        component: GamesComponent,
        canActivate: [DashboardGuard],
      },
      {
        path: 'manage',
        loadChildren: () =>
          import('../manage/manage.module').then((m) => m.ManageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
