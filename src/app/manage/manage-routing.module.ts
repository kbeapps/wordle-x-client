import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './components/manage/manage.component';
import { FriendsComponent } from './friends/friends.component';
import { GroupsComponent } from './groups/groups.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardGuard } from '../dashboard/guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
    children: [
      {
        path: 'friends',
        component: FriendsComponent,
        canActivate: [DashboardGuard],
      },
      {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [DashboardGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [DashboardGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoutingModule {}
