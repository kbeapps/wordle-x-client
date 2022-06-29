import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser, ILoginRequest, ISignupRequest } from '@client/data-models';

export const AuthActions = createActionGroup({
  source: 'Auth API',
  events: {
    Init: emptyProps(),
    Login: props<{ payload: ILoginRequest }>(),
    'Load Auth Success': props<{ user: IUser }>(),
    'Load Auth Fail': props<{ error: string }>(),
    Signup: props<{payload: ISignupRequest}>()
  },
});
