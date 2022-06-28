import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { API_URL } from '@client/shared/http-client';
import { APP_TITLE } from '@client/layout/landing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@client/layout/landing/src').then(
              (m) => m.LayoutLandingModule
            ),
        },
        {
          path: 'dashboard',
          loadChildren: () =>
            import('@client/layout/dashboard/src').then(
              (m) => m.LayoutDashboardModule
            ),
        },
      ],
      {
        initialNavigation: 'enabledBlocking',
      }
    ),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
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
