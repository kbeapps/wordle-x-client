import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { IUser } from '@client/data-models';
import { AuthActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends EntityState<IUser> {
  user: IUser;
  loaded: boolean;
  error?: string | null;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const authAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export const initialState: State = authAdapter.getInitialState({
  user: {
    _id: '',
    email: '',
    username: '',
    avatar: '',
    friends: [],
    games: [],
    groups: [],
  },
  loaded: false,
});

const authReducer = createReducer(
  initialState,
  on(AuthActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(AuthActions.login, (state) => ({ ...state, loaded: true })),
  on(AuthActions.loadLoginSuccess, (state, { user }) =>
    authAdapter.setOne(user, { ...state, loaded: true })
  ),
  on(AuthActions.loadLoginFail, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
