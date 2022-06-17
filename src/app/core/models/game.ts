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

export class Game {
  _id?: string = '';
  name: string = '';
  ownerId: string = '';
  players: string[] = [];
  wordHistory: string[] = [];
  boards: object[] = [];
  type: string = '';
  winCondition: string = '';
  wordSize: number = 0;
  theme: string = '';
}
