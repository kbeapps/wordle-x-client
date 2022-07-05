import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { GamesService } from '../games.service';
import { GameActions } from './game.actions';
import { concatMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getKeyboardRows } from './game.selectors';
import { IKey, IKeyboardRow } from '@client/data-models';

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

  updateKeyboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.updateKeyboard),
      map((action) => {
        let keyboardRows: IKeyboardRow[] = [];
        this.store.select(getKeyboardRows).subscribe((rows) => {
          keyboardRows = [...rows];
        });
        const updatedKeyboardRows: IKeyboardRow[] = [
          { position: 'top', keys: [] },
          { position: 'middle', keys: [] },
          { position: 'bottom', keys: [] },
        ];

        for (const [index, keyboardRow] of updatedKeyboardRows.entries()) {
          keyboardRow.keys = keyboardRows[index].keys.map((setKey) => {
            let newKey: IKey | null = null;
            for (const mappedKey of action.keyMap) {
              if (setKey.key === mappedKey.key && setKey.color !== 'correct') {
                newKey = {
                  key: setKey.key,
                  color: mappedKey.color,
                };
              }
            }
            return newKey ? newKey : setKey;
          });
        }
        return GameActions.initializeKeyboard({
          keyboard: { rows: updatedKeyboardRows },
        });
      })
    )
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
