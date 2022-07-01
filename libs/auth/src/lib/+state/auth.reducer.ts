import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { IUser } from '@client/data-models';
import { AuthActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends EntityState<IUser> {
  user: IUser;
  loggedIn: boolean;
  selectedId?: string | number;
  loading: boolean;
  error?: string | null;
}

export interface AuthState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const authAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
  selectId: (user) => user._id,
});

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
  loggedIn: false,
  loading: false,
});

const reducer = createReducer(
  initialState,
  on(AuthActions.initialize, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AuthActions.login, (state) => ({ ...state, loading: true })),



  
  on(AuthActions.loadAuthSuccess, (state, { user }) => {
    return authAdapter.setOne(user, {
      ...state,
      user: user,
      loading: false,
      loggedIn: true,
    });
  }),
  on(AuthActions.loadAuthFail, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    loggedIn: false,
  })),
  on(AuthActions.initialize, (state) => ({ ...state }))
);

export function authReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
