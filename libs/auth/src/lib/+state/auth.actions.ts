import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ILoginRequest, ISignupRequest, IUser } from '@client/data-models';

const source = 'Auth Api';

export enum AuthActionTypes {
  login = '[Auth Api] Login',
  logout = '[Auth Api] Logout',
  signup = '[Auth Api] Signup',
  authSuccess = '[Auth Api] Auth Success',
  authFail = '[Auth Api] Auth Fail',
}

export const AuthActions = createActionGroup({
  source: source,
  events: {
    Login: props<{ payload: ILoginRequest }>(),
    Logout: emptyProps,
    Signup: props<{ payload: ISignupRequest }>(),
    'Auth Success': props<{ user: IUser }>(),
    'Auth Fail': props<{ error: string }>(),
  },
});
