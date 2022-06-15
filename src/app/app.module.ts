import { NgModule } from '@angular/core';
import { AppRoutingModule } from './core/modules/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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

import { RequestButtonComponent } from './shared/components/request-button/request-button.component';
import { ThemeToggleComponent } from './dashboard/profile/components/theme-toggle/theme-toggle.component';
import { GameboardComponent } from './dashboard/games/gameboard/gameboard.component';
import { KeyboardComponent } from './dashboard/games/gameboard/keyboard/keyboard.component';
import { BoardRowComponent } from './dashboard/games/gameboard/board-row/board-row.component';

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
    RequestButtonComponent,
    ThemeToggleComponent,
    GameboardComponent,
    KeyboardComponent,
    BoardRowComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
