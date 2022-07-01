import { ActionReducer } from '@ngrx/store';
import { setData, getData } from './local-store.service';

// export interface LocalStore {
//   auth: AuthState;
// }

export const localStoreReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    if (action?.type.startsWith('[')) {
      console.log('test');
    }

    return reducer(state, action);
  };
};
