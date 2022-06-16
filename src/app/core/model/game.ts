export class Game {
  _id: string = '';
  name: string = '';
  ownerId: string = '';
  players: string[] = [];
  wordHistory: string[] = [];
  boards: object[] = [];
  type: string = '';
  winCondition: string = '';
  wordSize: number = 0;
  theme: string = '';

  constructor(
    _id: string,
    name: string,
    ownerId: string,
    players: string[],
    wordHistory: string[],
    type: string,
    winCondition: string,
    wordSize: number,
    boards: object[],
    theme: string
  ) {
    this._id = _id;
    this.name = name;
    this.ownerId = ownerId;
    this.players = players;
    this.wordHistory = wordHistory;
    this.boards = boards;
    this.type = type;
    this.winCondition = winCondition;
    this.wordSize = wordSize;
    this.theme = theme;
  }
}
