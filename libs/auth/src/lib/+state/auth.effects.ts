import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { AuthService } from '../services';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private authService: AuthService,
    private store: Store
  ) {}

  // initialize$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(AuthActions.initialize),
  //     exhaustMap((action) =>
  //       this.authService.initialize(action.payload).pipe(
  //         map((user) => AuthActions.loadAuthSuccess({ user: user })),
  //         catchError((error) => of(AuthActions.loadAuthFail({ error })))
  //       )
  //     )
  //   );
  // });

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap((action) =>
        this.authService.login(action.payload).pipe(
          map((response) =>
            AuthActions.loadAuthSuccess({ user: response.data })
          ),
          catchError((error) => of(AuthActions.loadAuthFail({ error })))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      concatMap((action) =>
        this.authService.signup(action.payload).pipe(
          map((response) =>
            AuthActions.loadAuthSuccess({ user: response.data })
          ),
          catchError((error) => of(AuthActions.loadAuthFail({ error })))
        )
      )
    )
  );
}
