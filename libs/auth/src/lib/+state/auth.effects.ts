import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { AuthService } from '../services';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private authService: AuthService
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap((action) =>
        this.authService.login(action.payload).pipe(
          map((response) =>
            AuthActions.loadLoginSuccess({ user: response.data })
          ),
          catchError((error) => of(AuthActions.loadLoginFail({ error })))
        )
      )
    );
  });
}
