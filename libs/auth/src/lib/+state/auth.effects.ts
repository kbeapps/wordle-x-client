import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { AuthService } from '../services';
import { concatMap, map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // initialize$ = createEffect(() =>
  //   this.actions$.pipe(
  //     exhaustMap((action) =>
  //       this.authService.initialize().pipe(
  //         map((response) => AuthActions.authSuccess({ user: response })),
  //         catchError((error) => of(AuthActions.authFail({ error })))
  //       )
  //     )
  //   )
  // );

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

  logout$$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        tap(() => this.router.navigate(['/dashboard/play']))
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
