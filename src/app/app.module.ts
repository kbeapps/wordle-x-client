import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendsComponent } from './dashboard/friends/friends/friends.component';
import { GamesComponent } from './dashboard/games/games/games.component';
import { GroupsComponent } from './dashboard/groups/groups/groups.component';
import { ProfileComponent } from './dashboard/profile/profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './landing/login/login/login.component';
import { SignupComponent } from './landing/signup/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FriendsComponent,
    GamesComponent,
    GroupsComponent,
    ProfileComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
