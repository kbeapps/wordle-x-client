import { Injectable } from '@angular/core';
import { HttpRequestService, IResponse } from 'src/app/shared';
import { AuthService } from '../../shared/services/auth.service';

interface ISignupPayload {
  email: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(
    private authService: AuthService,
    private http: HttpRequestService
  ) {}

  // async requestSignup(
  //   email: string,
  //   username: string,
  //   password: string
  // ): Promise<void> {
  //   const signupRequestPayload: ISignupPayload = {
  //     email: email,
  //     username: username,
  //     password: password,
  //   };
  //   try {
  //     const res: IResponse | void = await this.http.post(
  //       'auth/signup',
  //       signupRequestPayload
  //     );
  //     if (res) {
  //       // add return user on signup to backend
  //       this.authService.storeUser(res.data);
  //       this.authService.toggleIsLoggedIn(true);
  //     }
  //   } catch (error) {
  //     throw new Error(error instanceof Error ? error.message : undefined);
  //   }
  // }
}
