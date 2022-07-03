import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, IAuthState } from './auth.reducer';

const getAuthState = createFeatureSelector<IAuthState>(AUTH_FEATURE_KEY);

export const getAuthLoading = createSelector(
  getAuthState,
  (state: IAuthState) => state.loading
);

export const getAuthError = createSelector(
  getAuthState,
  (state: IAuthState) => state.error
);

export const getIsLoggedIn = createSelector(
  getAuthState,
  (state: IAuthState) => state.loggedIn
);

export const getUser = createSelector(
  getAuthState,
  (state: IAuthState) => state.user
);

export const getUserId = createSelector(
  getAuthState,
  (state: IAuthState) => state.user._id
);