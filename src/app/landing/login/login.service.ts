import { Injectable } from '@angular/core';
import {
  HttpRequestService,
  IResponse,
} from 'src/app/shared/utils/http-request.service';
import { AuthService } from '../../shared/services/auth.service';

interface ILoginPayload {
  email?: string;
  username?: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private authService: AuthService,
    private http: HttpRequestService
  ) {}

  async requestLogin(emailOrUsername: string, password: string): Promise<void> {
    const loginRequestPayload: ILoginPayload = {
      password: password,
    };
    loginRequestPayload[emailOrUsername.includes('@') ? 'email' : 'username'] =
      emailOrUsername;

    try {
      const res: IResponse | void = await this.http.post(
        'auth/signin',
        loginRequestPayload
      );
      if (res) {
        this.authService.storeUser(res.data);
        this.authService.toggleIsLoggedIn(true);
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : undefined);
    }
  }
}
