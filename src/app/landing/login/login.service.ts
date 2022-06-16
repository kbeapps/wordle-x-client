import { Injectable } from '@angular/core';
import { HttpRequestService, IResponse } from 'src/app/shared';
import { AuthService } from '../../shared/services/auth.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  public requestLogin(emailOrUsername: string, password: string) {
    const loginRequestPayload: ILoginPayload = {
      password: password,
    };
    loginRequestPayload[emailOrUsername.includes('@') ? 'email' : 'username'] =
      emailOrUsername;

    return this.http.post('auth/signin', loginRequestPayload).pipe(
      catchError((error) => {
        throw new Error(error.error.message);
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
