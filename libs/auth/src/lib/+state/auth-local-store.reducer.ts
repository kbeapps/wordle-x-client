import { ActionReducer } from '@ngrx/store';
import { setData, getData } from '@client/shared/local-store';
import { IAuthAction } from '@client/data-models';
import { AuthActionTypes } from './auth.actions';

export interface IAuthLocalStore {
  loggedIn: boolean;
  _id: string;
  username: string;
}

export const loggedInKey = 'loggedIn';
export const idKey = '_id';
export const usernameKey = 'username';
export const gameKey = 'game';

export const authStoreReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    const type = action?.type;

    switch (true) {
      case type === AuthActionTypes.authSuccess:
        if (Object.keys(action).includes('user')) {
          const authAction = action as IAuthAction;
          const user = authAction.user;
          setData(idKey, user?._id);
          setData(usernameKey, user?.username);
          setData(loggedInKey, String(true));
        }
        break;

      default:
        break;
    }

    return reducer(state, action);
  };
};
