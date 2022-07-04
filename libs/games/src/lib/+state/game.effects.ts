import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { GamesService } from '../games.service';
import { GameActions } from './game.actions';
import { concatMap, map } from 'rxjs/operators';

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

  initializeGameboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.initializeGameboard),
      concatMap((action) =>
        this.gameService
          .initializeGameboard(action.totalGuesses, action.wordSize)
          .pipe(
            map((gameStore) =>
              GameActions.gameLoadSuccessful({ gameStore: gameStore })
            )
          )
      )
    )
  );
}
