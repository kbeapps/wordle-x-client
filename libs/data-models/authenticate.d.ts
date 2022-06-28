import { IUser } from './user';

interface ILoginRequestBase {
  password: string;
}

interface ILoginRequestEmail extends ILoginRequestBase {
  email: string;
}

interface ILoginRequestUsername extends ILoginRequestBase {
  username: string;
}

export type ILoginRequest = ILoginRequestEmail | ILoginRequestUsername;

interface ILoginResponse {
  message: string;
  data: IUser;
}

export interface ISignupRequest {}
