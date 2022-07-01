import { ActionReducer } from '@ngrx/store';
import { setData, getData } from './local-store.service';
import { IUser } from '@client/data-models';
import { AuthActionTypes } from '@client/auth';

export interface GameStore {
  guesses: { guess: string[]; output: string[] }[];
  winState: boolean;
}

export interface LocalStore {
  loggedIn: string;
  user: IUser;
  game: GameStore;
}

const userKey = 'user';
const loggedInKey = 'loggedIn';
const gameKey = 'game';

export const localStoreReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    const type = action?.type;

    switch (true) {
      case type === AuthActionTypes.authSuccess:
        // setData(userKey, action?.user);

        break;

      default:
        break;
    }

    return reducer(state, action);
  };
};
