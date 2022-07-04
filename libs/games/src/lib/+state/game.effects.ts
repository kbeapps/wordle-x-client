import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { GamesService } from '../games.service';
import { GameActions } from './game.actions';
import { concatMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class GameEffects {
  constructor(
    private readonly actions$: Actions,
    private gameService: GamesService,
    private store: Store
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

  // updateGuesses$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(GameActions.updateActiveGuess),
  //     mergeMap((action: { guess: any; row: any }) =>
  //       this.store.select(getActiveGuesses).pipe(
  //         map((guesses) => {
  //           const updatedGuess = [...action.guess];
  //           const rowIndex = action.row;
  //           const updatedGuesses = guesses.map((guess, index) =>
  //             index === rowIndex
  //               ? {
  //                   guess: updatedGuess,
  //                   evaluation: guesses[index].evaluation,
  //                 }
  //               : guess
  //           );
  //           console.log('update guess');
  //           return GameActions.updateGuesses({ guesses: updatedGuesses });
  //         })
  //       )
  //     )
  //   )
  // );
}
