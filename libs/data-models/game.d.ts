export interface IGame {
  _id?: string;
  name: string;
  ownerId: string;
  players: string[];
  wordHistory: string[];
  type: string;
  winCondition: string;
  wordSize: number;
  boards: object[];
  theme: string;
}

export interface IGuess {
  guess: string[];
  evaluation: string[];
}

export interface IGameStore {
  guesses: IGuess[];
  row: number;
  winState: boolean;
}

export interface IKey {
  key: string;
  color: string;
}

export interface IKeyboardRow {
  position: 'top' | 'middle' | 'bottom';
  keys: IKey[];
}

export interface IKeyboard {
  rows: IKeyboardRow[];
}
