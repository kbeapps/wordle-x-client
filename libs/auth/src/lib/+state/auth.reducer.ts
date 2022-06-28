import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { IUser } from '@client/data-models';
import { AuthActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends EntityState<IUser> {
  user: IUser;
  selectedId?: string | number;
  loading: boolean;
  error?: string | null;
}

export interface AuthPartialState {
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
  loading: false,
});

const reducer = createReducer(
  initialState,
  on(AuthActions.init, (state) => ({ ...state, loading: false, error: null })),
  on(AuthActions.login, (state) => ({ ...state, loading: true })),
  on(AuthActions.loadLoginSuccess, (state, { user }) => {
    return authAdapter.setOne(user, { ...state, user: user, loading: false });
  }),
  on(AuthActions.loadLoginFail, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

export function authReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
