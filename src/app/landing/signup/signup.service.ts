import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services';
import { AuthService } from '../../shared/services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
          this.authService.storeUser(res.data);
          this.authService.toggleIsLoggedIn(true);
          return true;
        }
        return false;
      })
    );
  }
}
