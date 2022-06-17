import { Injectable } from '@angular/core';
import {
  AuthService,
  HttpRequestService,
  UserService,
} from '../shared/services';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/core';

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
    private http: HttpRequestService,
    private userService: UserService
  ) {}

  public requestSignup(
    email: string,
    username: string,
    password: string
  ): Observable<boolean> {
    const signupRequestPayload: ISignupPayload = {
      email: email,
      username: username,
      password: password,
    };

    return this.http.post('auth/signup', signupRequestPayload).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
      map((res) => {
        if (res) {
          this.userService.user = res.data as User;
          this.authService.toggleIsLoggedIn(true);
          return true;
        }
        return false;
      })
    );
  }
}
