import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IGame, IGuess, IKeyboard, IGameStore } from '@client/data-models';

const source = 'Game';

export enum GameActionTypes {
  create = '[Game] Create',
  get = '[Game] Get',
  update = '[Game] Update',
  initializeKeyboard = '[Game] Initialize Keyboard',
  initializeGameboard = '[Game] Initialize Gameboard',
  gameLoadSuccessful = '[Game] Game Load Successful',
  updateActiveWinState = '[Game] Update Active WinState',
  updateGuess = '[Game] Update Guess',
}

export const GameActions = createActionGroup({
  source: source,
  events: {
    Create: props<{ game: IGame }>(),
    Get: emptyProps(),
    Update: emptyProps(),
    'Initialize Keyboard': props<{ keyboard: IKeyboard }>(),
    'Initialize Gameboard': props<{ totalGuesses: number; wordSize: number }>(),
    'Game Load Successful': props<{ gameStore: IGameStore }>(),
    'Update Active WinState': props<{ winState: boolean }>(),
    'Update Guess': props<{ guess: IGuess }>(),
  },
});
