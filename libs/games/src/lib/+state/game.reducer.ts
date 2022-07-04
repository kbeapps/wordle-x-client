import { createReducer, on, Action } from '@ngrx/store';
import { IGame, IKeyboard, IKey } from '@client/data-models';
import { GameActions } from './game.actions';

export const GAME_FEATURE_KEY = 'game';

export interface IGameState {
  game: IGame;
  keyboard: IKeyboard;
  loading: boolean;
  error?: string | null;
}

export const initialState: IGameState = {
  game: {
    _id: '',
    name: '',
    ownerId: '',
    players: [],
    wordHistory: [],
    type: '',
    winCondition: '',
    wordSize: 5,
    boards: [],
    theme: '',
  },
  keyboard: {
    rows: [],
  },
  loading: false,
};

const reducer = createReducer(
  initialState,
  on(GameActions.create, (state, { game }) => ({
    ...state,
    game: game,
    loading: false,
  })),
  on(GameActions.get, (state) => ({ ...state, loading: false })),
  on(GameActions.initializeKeyboard, (state, { keyboard }) => ({
    ...state,
    keyboard: keyboard,
    loading: false,
  }))
);

export function gameReducer(state: IGameState | undefined, action: Action) {
  return reducer(state, action);
}
