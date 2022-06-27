import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthApiActions } from './auth.actions';
import { AuthService } from '../services';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.login),
      concatMap((action) =>
        this.authService.login(action).pipe(
          catchError((error) =>
            of(AuthApiActions.loginFail({ message: error.message }))
          ),
          map((response) => AuthApiActions.loginSuccess(response))
        )
      )
    )
  );
}
