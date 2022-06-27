import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser, ILoginRequest } from '@client/data-models';

export const AuthActions = createActionGroup({
  source: 'Auth API',
  events: {
    Init: emptyProps(),
    Login: props<{ payload: ILoginRequest }>(),
    'Load Login Success': props<{ user: IUser }>(),
    'Load Login Fail': props<{ error: string }>(),
  },
});
