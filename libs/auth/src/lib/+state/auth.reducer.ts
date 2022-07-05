import { createReducer, on, Action } from '@ngrx/store';
import { IUser } from '@client/data-models';
import { AuthActions } from './auth.actions';
import { getData } from '@client/shared/local-store';
import { loggedInKey } from './auth-local-store.reducer';

export const AUTH_FEATURE_KEY = 'auth';

export interface IAuthState {
  user: IUser;
  loggedIn: boolean;
  loading: boolean;
  error?: string | null;
}

const loggedIn = String(getData(loggedInKey)) === 'true';

export const initialState: IAuthState = {
  user: {
    _id: '',
    email: '',
    username: '',
    avatar: '',
    friends: [],
    games: [],
    groups: [],
  },
  loggedIn: loggedIn,
  loading: false,
};

const reducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, loading: true })),
  on(AuthActions.loggedInRedirect, (state) => ({ ...state, loggedIn: true })),
  on(AuthActions.logout, (state) => ({
    ...state,
    loggedIn: false,
    loading: false,
  })),
  on(AuthActions.authSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
    loggedIn: true,
  })),
  on(AuthActions.authFail, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    loggedIn: false,
  }))
);

export function authReducer(state: IAuthState | undefined, action: Action) {
  return reducer(state, action);
}
