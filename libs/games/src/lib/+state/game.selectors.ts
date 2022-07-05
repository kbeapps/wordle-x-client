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

export const getActiveRow = createSelector(
  getGameState,
  (state: IGameState) => state.row
);

export const getActiveGuesses = createSelector(
  getGameState,
  (state: IGameState) => state.guesses
);

export const getCurrentGuesses = createSelector(
  getGameState,
  (state: IGameState) => ({
    guesses: state.guesses,
    activeIndex: state.row,
  })
);

export const getCurrentGuessEvaluation = createSelector(
  getGameState,
  (state: IGameState) => state.guesses[state.row].evaluation
);

export const getWordSize = createSelector(
  getGameState,
  (state: IGameState) => state.game.wordSize
);

export const getIsWon = createSelector(
  getGameState,
  (state: IGameState) => state.winState
);
