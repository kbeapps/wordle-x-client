import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IGame, IKeyboard } from '@client/data-models';

const source = 'Game';

export enum GameActionTypes {
  create = '[Game] Create',
  get = '[Game] Get',
  update = '[Game] Update',
  initializeKeyboard = '[Game] Initialize Keyboard',
}

export const GameActions = createActionGroup({
  source: source,
  events: {
    Create: props<{ game: IGame }>(),
    Get: emptyProps(),
    Update: emptyProps(),
    'Initialize Keyboard': props<{ keyboard: IKeyboard }>(),
  },
});
