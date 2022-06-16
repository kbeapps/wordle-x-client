export class Game {
  _id: string = '';
  name: string = '';
  ownerId: string = '';
  players: string[] = [];
  wordHistory: string[] = [];
  boards?: object[] = [];
  type: string = '';
  winCondition: string = '';
  wordSize: number = 0;
  theme?: string = '';
}
