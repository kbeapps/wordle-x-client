import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthService } from '../services';
import { concatMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthActions } from '../+state';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      concatMap(() =>
        this.authService.getUser().pipe(
          map((response) => AuthActions.authSuccess({ user: response.data })),
          catchError((error) => of(AuthActions.authFail({ error })))
        )
      )
    )
  );

  loggedInRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loggedInRedirect),
        tap(() => this.router.navigate(['/dashboard/play']))
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap((action) =>
        this.authService.login(action.payload).pipe(
          map((response) => AuthActions.authSuccess({ user: response.data })),
          catchError((error) => of(AuthActions.authFail({ error })))
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.router.navigate(['/auth/login']))
      ),
    { dispatch: false }
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        tap(() => {
          if (!this.router.url.includes('dashboard')) {
            this.router.navigate(['/dashboard/play']);
          }
        })
      ),
    { dispatch: false }
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      concatMap((action) =>
        this.authService.signup(action.payload).pipe(
          map((response) => AuthActions.authSuccess({ user: response.data })),
          catchError((error) => of(AuthActions.authFail({ error })))
        )
      )
    )
  );
}
