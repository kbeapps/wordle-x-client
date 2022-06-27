import { AuthApiActions } from './auth.actions';
import { IUser } from '@client/data-models';
import { createReducer, on } from '@ngrx/store';

export interface AuthData {
  loading: boolean;
  user: IUser | null;
  error: Error | null;
}
export interface AuthState {
  readonly auth: AuthData;
}

export const initialState: AuthData = {
  error: null,
  user: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthApiActions.init, (state) => ({ ...state })),
  on(AuthApiActions.login, (state) => ({ ...state, loading: true })),
  on(AuthApiActions.loginSuccess, (state, action) => ({
    ...state,
    user: action.payload,
    loading: false,
  })),
  on(AuthApiActions.loginFail, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  }))
);
