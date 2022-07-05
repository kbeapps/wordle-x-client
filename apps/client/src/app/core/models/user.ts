export interface IUser {
  _id?: string;
  email: string;
  username: string;
  avatar: string;
  friends: string[];
  games: string[];
  groups: string[];
}

export class User {
  _id?: string = '';
  email: string = '';
  username: string = '';
  avatar: string = '';
  games: string[] = [];
  friends: string[] = [];
  groups: string[] = [];
}
