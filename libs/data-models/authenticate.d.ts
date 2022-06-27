import { IUser } from './user';

export interface ILoginRequest {
  emailOrUsername: string;
  password: string;
}

interface ILoginResponse {
  message: string;
  data?: IUser;
}

export interface ISignupRequest {}
