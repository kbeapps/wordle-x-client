import { ActionReducer } from '@ngrx/store';
import { setData } from '@client/shared/local-store';
import { GameActionTypes } from './game.actions';

export const winStateKey = 'winstate';
export const guessesKey = 'guesses';
export const rowKey = 'row';

export const gameStoreReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    const type = action?.type;

    switch (true) {
      case type === GameActionTypes.create:
        setData(winStateKey, 'false');
        setData(guessesKey, []);
        setData(rowKey, '0');
        break;

      default:
        break;
    }

    return reducer(state, action);
  };
};
