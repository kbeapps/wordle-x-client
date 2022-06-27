import { AuthApiActions } from './auth.actions';
import { IUser } from '@client/data-models';
import { createReducer, on } from '@ngrx/store';

export interface AuthData {
  loading: boolean;
  user: IUser;
  error: string;
}
export interface AuthState {
  readonly auth: AuthData;
}

export const initialState: AuthData = {
  error: '',
  user: {
    _id: '',
    email: '',
    username: '',
    avatar: '',
    friends: [],
    games: [],
    groups: [],
  },
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthApiActions.init, (state) => ({ ...state })),
  on(AuthApiActions.login, (state) => ({ ...state, loading: true })),
  on(AuthApiActions.loginSuccess, (state, action) => ({
    ...state,
    user: action.data ? action.data : initialState.user,
    loading: false,
  })),
  on(AuthApiActions.loginFail, (state, action) => ({
    ...state,
    error: action.message,
    loading: false,
  }))
);
