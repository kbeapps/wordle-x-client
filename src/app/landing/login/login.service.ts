import { Injectable } from '@angular/core';
import {
  AuthService,
  HttpRequestService,
  UserService,
} from 'src/app/shared/services';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core';

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
    private http: HttpRequestService,
    private userService: UserService
  ) {}

  public requestLogin(
    emailOrUsername: string,
    password: string
  ): Observable<boolean> {
    const loginRequestPayload: ILoginPayload = {
      password: password,
    };
    loginRequestPayload[emailOrUsername.includes('@') ? 'email' : 'username'] =
      emailOrUsername;

    return this.http.post('auth/signin', loginRequestPayload).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
      map((res) => {
        if (res) {
          this.userService.user = res.data as IUser;
          this.authService.toggleIsLoggedIn(true);
          return true;
        }
        return false;
      })
    );
  }
}
