import { ActionReducer } from '@ngrx/store';
import { setData, getData } from './local-store.service';
import { IUser } from '@client/data-models';
import { AuthActionTypes } from '@client/auth';

interface IAuthAction {
  type: string;
  user: IUser;
}

export interface IGameStore {
  guesses: { guess: string[]; output: string[] }[];
  winState: boolean;
}

export interface ILocalStore {
  loggedIn: boolean;
  _id: string;
  username: string;
  game: IGameStore | null;
}

class LocalStore implements ILocalStore {
  loggedIn = false;
  _id = '';
  username = '';
  game = null;
}

export const loggedInKey = 'loggedIn';
export const idKey = '_id';
export const usernameKey = 'username';
export const gameKey = 'game';

export const localStoreReducer = (
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
