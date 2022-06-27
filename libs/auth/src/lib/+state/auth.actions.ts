import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ILoginRequest, ILoginResponse } from '@client/data-models';

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    Init: emptyProps(),
    Login: props<ILoginRequest>(),
    'Login Success': props<ILoginResponse>(),
    'Login Fail': props<ILoginResponse>(),
  },
});
