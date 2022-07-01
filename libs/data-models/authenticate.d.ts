import { IUser } from './user';

interface IAuthAction {
  type: string;
  user: IUser;
}

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

interface IAuthResponse {
  message: string;
  data: IUser;
}

export interface ISignupRequest {
  email: string;
  username: string;
  password: string;
}
