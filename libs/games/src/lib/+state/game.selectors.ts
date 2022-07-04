import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GAME_FEATURE_KEY, IGameState } from './game.reducer';

const getGameState = createFeatureSelector<IGameState>(GAME_FEATURE_KEY);

export const getGameLoading = createSelector(
  getGameState,
  (state: IGameState) => state.loading
);

export const getGameError = createSelector(
  getGameState,
  (state: IGameState) => state.error
);

export const getGame = createSelector(
  getGameState,
  (state: IGameState) => state.game
);

export const getGameId = createSelector(
  getGameState,
  (state: IGameState) => state.game._id
);

export const getKeyboardRows = createSelector(
  getGameState,
  (state: IGameState) => state.keyboard.rows
);
