import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAuthenticate, IUser } from '@client/data-models';

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    Init: emptyProps(),
    Login: props<{ payload: IAuthenticate }>(),
    'Login Success': props<{ payload: IUser }>(),
    'Login Fail': (error: Error) => ({ error }),
  },
});
