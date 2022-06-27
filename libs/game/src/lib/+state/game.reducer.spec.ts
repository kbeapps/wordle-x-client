import { Action } from '@ngrx/store';

import * as GameActions from './game.actions';
import { GameEntity } from './game.models';
import { State, initialState, reducer } from './game.reducer';

describe('Game Reducer', () => {
  const createGameEntity = (id: string, name = ''): GameEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Game actions', () => {
    it('loadGameSuccess should return the list of known Game', () => {
      const game = [
        createGameEntity('PRODUCT-AAA'),
        createGameEntity('PRODUCT-zzz'),
      ];
      const action = GameActions.loadGameSuccess({ game });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
