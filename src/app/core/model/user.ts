export class User {
  _id: string = '';
  email: string = '';
  username: string = '';
  avatar: string = '';
  friends: string[] = [];
  games: string[] = [];
  groups: string[] = [];

  constructor(
    email: string,
    username: string,
    avatar: string,
    friends: string[],
    games: string[],
    groups: string[],
    _id?: string
  ) {
    this.email = email;
    this.username = username;
    this.avatar = avatar;
    this.friends = friends;
    this.games = games;
    this.groups = groups;

    if (_id) {
      this._id = _id;
    }
  }
}
