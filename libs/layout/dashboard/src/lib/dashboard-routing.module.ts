import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent, ManageComponent } from './components';
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
      {
        path: 'manage',
        component: ManageComponent,
        children: [
          {
            path: 'friends',
            loadChildren: () =>
              import('@client/friends').then((m) => m.FriendsModule),
          },
          {
            path: 'groups',
            loadChildren: () =>
              import('@client/groups').then((m) => m.GroupsModule),
          },
          {
            path: 'profile',
            loadChildren: () =>
              import('@client/profile').then((m) => m.ProfileModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
