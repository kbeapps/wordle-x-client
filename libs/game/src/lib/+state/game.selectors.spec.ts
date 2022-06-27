import { GameEntity } from './game.models';
import { gameAdapter, GamePartialState, initialState } from './game.reducer';
import * as GameSelectors from './game.selectors';

describe('Game Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGameId = (it: GameEntity) => it.id;
  const createGameEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GameEntity);

  let state: GamePartialState;

  beforeEach(() => {
    state = {
      game: gameAdapter.setAll(
        [
          createGameEntity('PRODUCT-AAA'),
          createGameEntity('PRODUCT-BBB'),
          createGameEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Game Selectors', () => {
    it('getAllGame() should return the list of Game', () => {
      const results = GameSelectors.getAllGame(state);
      const selId = getGameId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = GameSelectors.getSelected(state) as GameEntity;
      const selId = getGameId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getGameLoaded() should return the current "loaded" status', () => {
      const result = GameSelectors.getGameLoaded(state);

      expect(result).toBe(true);
    });

    it('getGameError() should return the current "error" state', () => {
      const result = GameSelectors.getGameError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
