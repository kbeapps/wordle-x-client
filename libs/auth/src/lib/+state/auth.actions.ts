import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ILoginRequest, ISignupRequest, IUser } from '@client/data-models';

const source = 'Auth Api';

export enum AuthActionTypes {
  login = '[Auth Api] Login',
  loggedInRedirect = '[Auth Api] Logged in Redirect',
  logout = '[Auth Api] Logout',
  signup = '[Auth Api] Signup',
  authSuccess = '[Auth Api] Auth Success',
  authFail = '[Auth Api] Auth Fail',
  getUser = '[Auth Api] Get User',
}

export const AuthActions = createActionGroup({
  source: source,
  events: {
    Login: props<{ payload: ILoginRequest }>(),
    'Logged In Redirect': emptyProps,
    Logout: emptyProps(),
    Signup: props<{ payload: ISignupRequest }>(),
    'Auth Success': props<{ user: IUser }>(),
    'Auth Fail': props<{ error: string }>(),
    'Get User': emptyProps(),
  },
});
