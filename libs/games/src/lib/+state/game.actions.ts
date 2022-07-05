import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  IGame,
  IGuess,
  IKeyboard,
  IGameStore,
  IKey,
} from '@client/data-models';

const source = 'Game';

export enum GameActionTypes {
  create = '[Game] Create',
  get = '[Game] Get',
  update = '[Game] Update',
  initializeKeyboard = '[Game] Initialize Keyboard',
  initializeGameboard = '[Game] Initialize Gameboard',
  gameLoadSuccessful = '[Game] Game Load Successful',
  updateActiveWinState = '[Game] Update Active WinState',
  updateActiveRow = '[Game] Update Active Row',
  updateGuesses = '[Game] Update Guesses',
  updateKeyboard = '[Game] Update Keyboard',
}

export const GameActions = createActionGroup({
  source: source,
  events: {
    Create: props<{ game: IGame }>(),
    Get: emptyProps(),
    Update: emptyProps(),
    'Initialize Keyboard': props<{ keyboard: IKeyboard }>(),
    'Update Keyboard': props<{ keyMap: IKey[] }>(),
    'Initialize Gameboard': props<{ totalGuesses: number; wordSize: number }>(),
    'Game Load Successful': props<{ gameStore: IGameStore }>(),
    'Update Active WinState': props<{ winState: boolean }>(),
    'Update Guesses': props<{ guesses: IGuess[] }>(),
    'Update Active Row': props<{ row: number }>(),
  },
});
