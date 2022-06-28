import { NgModule } from '@angular/core';
// import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// import { MaterialModule } from '@client/';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

// new imports:
import { RouterModule } from '@angular/router';
// import { authRoutes, AuthModule } from '@client/auth';
import { AuthModule, authRoutes } from '../../../../libs/auth/src';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    RouterModule.forRoot([{ path: 'auth', children: authRoutes }], {
      initialNavigation: 'enabledBlocking',
    }),
    // MaterialModule,
    BrowserModule,
    HttpClientModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
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
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
