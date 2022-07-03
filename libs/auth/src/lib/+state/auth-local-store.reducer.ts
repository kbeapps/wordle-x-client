import { ActionReducer } from '@ngrx/store';
import { setData, clearData } from '@client/shared/local-store';
import { AuthActionTypes } from './auth.actions';

export interface IAuthLocalStore {
  loggedIn: string;
}

export const loggedInKey = 'loggedIn';

export const authStoreReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    const type = action?.type;

    switch (true) {
      case type === AuthActionTypes.authSuccess:
        setData(loggedInKey, 'true');
        break;
      case type === AuthActionTypes.logout:
        clearData();
        break;

      default:
        break;
    }

    return reducer(state, action);
  };
};
