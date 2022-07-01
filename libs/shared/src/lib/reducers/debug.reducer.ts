import { ActionReducer } from '@ngrx/store';

export const debugReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    if (action?.type.startsWith('[')) {
      console.log('state: ', state);
      console.log('action: ', action);
      console.log('----------------');
    }

    return reducer(state, action);
  };
};
