import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../shared-services';
import { AuthService, UserService } from '../index';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core';

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
          this.userService.initializeUserStore(res.data as IUser);
          this.authService.toggleIsLoggedIn(true);
          return true;
        }
        return false;
      })
    );
  }
}
