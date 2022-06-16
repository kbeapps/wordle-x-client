export class User {
  _id: string = '';
  username: string = '';
  friends: string[] = [];
  games: string[] = [];
  groups: string[] = [];

  constructor(
    _id: string,
    username: string,
    friends: string[],
    games: string[],
    groups: string[]
  ) {
    this._id = _id;
    this.username = username;
    this.friends = friends;
    this.games = games;
    this.groups = groups;
  }
}
