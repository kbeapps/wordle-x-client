import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { AUTH_FEATURE_KEY, State, authAdapter } from './auth.reducer';
import { AUTH_FEATURE_KEY, State } from './auth.reducer';

export const getAuthState = createFeatureSelector<State>(AUTH_FEATURE_KEY);

// const { selectAll, selectEntities } = authAdapter.getSelectors();

export const getAuthLoaded = createSelector(
  getAuthState,
  (state: State) => state.loaded
);

export const getAuthError = createSelector(
  getAuthState,
  (state: State) => state.error
);

export const getUser = createSelector(
  getAuthState,
  (state: State) => state.user
);

// export const getAuthEntities = createSelector(getAuthState, (state: State) =>
//   selectEntities(state)
// );

// export const getSelectedId = createSelector(
//     getAuthState,
//     (state: State) => state.
// );

export const getSelected = createSelector(
  getUser,
  getAuthLoaded
  //   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
