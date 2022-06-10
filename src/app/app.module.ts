import { NgModule } from '@angular/core';
import { AppRoutingModule } from './core/modules/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './core/modules/material.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendsComponent } from './dashboard/friends/friends.component';
import { GamesComponent } from './dashboard/games/games.component';
import { GroupsComponent } from './dashboard/groups/groups.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './landing/login/login.component';
import { SignupComponent } from './landing/signup/signup.component';

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
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
