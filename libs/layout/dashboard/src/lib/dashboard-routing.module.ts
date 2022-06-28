import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
// import { GamesComponent } from '../games/components/games.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'play',
        loadChildren: () => import('@client/games').then((m) => m.GamesModule),
      },
      // {
      //   path: 'manage',
      //   loadChildren: () =>
      //     import('../manage/manage.module').then((m) => m.ManageModule),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
