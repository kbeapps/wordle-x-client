import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { GamesService } from '../games.service';
import { GameActions } from './game.actions';
import { concatMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class GameEffects {
  constructor(
    private readonly actions$: Actions,
    private gameService: GamesService
  ) {}

  initializeKeyboard$ = createEffect(
    () => this.actions$.pipe(ofType(GameActions.initializeKeyboard)),
    { dispatch: false }
  );

  // logout$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.logout),
  //       tap(() => this.router.navigate(['/auth/login']))
  //     ),
  //   { dispatch: false }
  // );

  // authSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.authSuccess),
  //       tap(() => {
  //         if (!this.router.url.includes('dashboard')) {
  //           this.router.navigate(['/dashboard/play']);
  //         }
  //       })
  //     ),
  //   { dispatch: false }
  // );
}
