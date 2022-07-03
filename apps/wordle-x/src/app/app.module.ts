import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { API_URL } from '@client/shared/http-client';
import { APP_TITLE } from '@client/layout/landing';

import { debugReducer } from '@client/shared/src';
import { authStoreReducer } from '@client/auth/src/';

import * as fromAuth from '@client/auth/src';
import { AuthEffects } from '@client/auth/src/lib/+state/auth.effects';
import { AuthModule } from '@client/auth/src/';

import { LandingGuard } from '@client/layout/landing/src/lib/guards/landing.guard';
import { DashboardGuard } from '@client/layout/dashboard/src/lib/guards/dashboard.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@client/layout/landing/src').then(
              (m) => m.LayoutLandingModule
            ),
          canActivate: [LandingGuard],
        },
        {
          path: 'dashboard',
          loadChildren: () =>
            import('@client/layout/dashboard/src').then(
              (m) => m.LayoutDashboardModule
            ),
          canActivate: [DashboardGuard],
        },
      ],
      {
        initialNavigation: 'enabledBlocking',
      }
    ),
    StoreModule.forRoot(
      { auth: fromAuth.authReducer },
      {
        metaReducers: !environment.production
          ? [debugReducer, authStoreReducer]
          : [authStoreReducer],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: APP_TITLE, useValue: environment.appTitle },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
