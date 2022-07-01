import { createActionGroup, props } from '@ngrx/store';
import { ILoginRequest, ISignupRequest, IUser } from '@client/data-models';
import { AuthState } from './auth.reducer';

export const AuthActions = createActionGroup({
  source: 'Auth API',
  events: {
    Initialize: props<{ authState: AuthState }>,
    Login: props<{ payload: ILoginRequest }>(),
    'Load Auth Success': props<{ user: IUser }>(),
    'Load Auth Fail': props<{ error: string }>(),
    Signup: props<{ payload: ISignupRequest }>(),
  },
});
