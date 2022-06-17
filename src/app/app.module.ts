import { NgModule } from '@angular/core';
import { AppRoutingModule } from './core/modules/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders, MaterialModule } from './core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './core/components/dashboard.component';
import { FriendsComponent } from './friends/friends.component';
import { GamesComponent } from './games/games.component';
import { GroupsComponent } from './groups/groups.component';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './core/components/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { RequestButtonComponent } from './shared/components/request-button/request-button.component';
import { ThemeToggleComponent } from './profile/components/theme-toggle/theme-toggle.component';
import { GameboardComponent } from './games/gameboard/gameboard.component';
import { KeyboardComponent } from './games/gameboard/keyboard/keyboard.component';
import { BoardRowComponent } from './games/gameboard/board-row/board-row.component';

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
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
