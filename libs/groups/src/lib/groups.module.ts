import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GroupsComponent } from './components/groups/groups.component';

export const groupsRoutes: Route[] = [
  {
    path: '',
    component: GroupsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [GroupsComponent],
})
export class GroupsModule {}
