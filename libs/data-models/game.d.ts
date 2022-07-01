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

export interface IGameStore {
  guesses: { guess: string[]; output: string[] }[];
  winState: boolean;
}
