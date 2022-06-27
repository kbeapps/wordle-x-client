import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GAME_FEATURE_KEY, State, gameAdapter } from './game.reducer';

// Lookup the 'Game' feature state managed by NgRx
export const getGameState = createFeatureSelector<State>(GAME_FEATURE_KEY);

const { selectAll, selectEntities } = gameAdapter.getSelectors();

export const getGameLoaded = createSelector(
  getGameState,
  (state: State) => state.loaded
);

export const getGameError = createSelector(
  getGameState,
  (state: State) => state.error
);

export const getAllGame = createSelector(getGameState, (state: State) =>
  selectAll(state)
);

export const getGameEntities = createSelector(getGameState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getGameState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getGameEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
