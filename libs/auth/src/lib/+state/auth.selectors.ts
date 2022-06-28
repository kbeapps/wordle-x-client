import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, State, authAdapter } from './auth.reducer';

const getAuthState = createFeatureSelector<State>(AUTH_FEATURE_KEY);

const { selectEntities } = authAdapter.getSelectors();

export const getAuthLoading = createSelector(
  getAuthState,
  (state: State) => state.loading
);

export const getAuthError = createSelector(
  getAuthState,
  (state: State) => state.error
);

export const getUser = createSelector(
  getAuthState,
  (state: State) => state.user
);

export const getAuthEntities = createSelector(getAuthState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getAuthState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getUser,
  getAuthLoading,
  getAuthEntities,
  (entities, selectedId) => (selectedId ? entities._id : undefined)
);
